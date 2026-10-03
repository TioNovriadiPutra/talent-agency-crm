import { DealSOWInput } from "@/interfaces/deal.interface";
import { quotationTemplate } from "@/utils/html_template";
import {
  generatePDF,
  methodNotAllowedError,
  responseError,
  responseSuccess,
} from "@/utils/server_helper";
import { createSupabaseClient } from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return methodNotAllowedError(res);
  }

  const { id } = req.query;

  const {
    agency_name,
    brand,
    campaign_name,
    sow,
    talent,
    version_number,
    document_number,
    proposed_value,
    tax_pct,
    tax,
    afterTax,
  } = req.body;

  const supabase = createSupabaseClient(req, res);

  const newDocumentNumber = (document_number as string).replace(
    `V${version_number || 0}`,
    `V${Number(version_number) + 1}`,
  );

  const html = quotationTemplate(
    newDocumentNumber,
    agency_name,
    brand,
    campaign_name,
    sow,
    talent,
    proposed_value,
    tax_pct,
    tax,
    afterTax,
  );

  const pdfBytes = await generatePDF(html);

  const { data, error } = await supabase.storage
    .from("quotations")
    .upload(
      `${newDocumentNumber.split("/").join("-")}.pdf`,
      Buffer.from(pdfBytes),
      {
        contentType: "application/pdf",
        upsert: false,
      },
    );

  if (error) {
    return responseError(res, 400, "Penyimpanan gagal!|Gagal menyimpan pdf.");
  }

  const { data: quotationUrl } = supabase.storage
    .from("quotations")
    .getPublicUrl(data.path);

  const { data: updateQuotationData, error: updateQuotationError } =
    await supabase
      .from("quotations")
      .update({
        proposed_value,
        tax_pct,
        generated_at: new Date().toISOString(),
        document_path: quotationUrl.publicUrl,
        document_number: newDocumentNumber,
        version_number:
          version_number !== null ? Number(version_number) + 1 : 1,
        status: null,
      })
      .eq("id", id)
      .select("deal:deals ( id )")
      .single()
      .overrideTypes<
        {
          deal: { id: string };
        },
        { merge: false }
      >();

  if (updateQuotationError) {
    return responseError(
      res,
      400,
      "Edit gagal!|Gagal mengubah quotation.",
      error,
    );
  }

  (sow as DealSOWInput[]).forEach(async (item) => {
    const { error: updateQuotationItemError } = await supabase
      .from("quotation_items")
      .update({
        content_name: item.content_name,
        quantity: item.quantity,
        due_date: item.due_date,
      })
      .eq("id", item.id);

    if (updateQuotationItemError) {
      return responseError(
        res,
        400,
        "Edit gagal!|Gagal mengubah quotation.",
        error,
      );
    }
  });

  return responseSuccess(
    res,
    200,
    "Generate berhasil!|Quotation berhasil digenerate.",
    { deal_id: updateQuotationData.deal.id },
  );
}
