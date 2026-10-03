import { formatDate } from "@/utils/client_helper";
import { stageData } from "@/utils/page_data";
import {
  internalServerError,
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
  if (req.method !== "PUT") {
    return methodNotAllowedError(res);
  }

  const { id } = req.query;

  const { stage } = req.body;

  const supabase = createSupabaseClient(req, res);

  const { data, error } = await supabase
    .from("deals")
    .update({
      stage,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(
      "inquiry_budget, agency:agencies ( id, agency_name ), default_items:inquiry_items ( content_name, quantity )",
    )
    .single()
    .overrideTypes<
      {
        inquiry_budget: number;
        agency: { id: string; agency_name: string };
        default_items: { content_name: string; quantity: number }[];
      },
      { merge: false }
    >();

  if (error) {
    return responseError(res, 400, "Edit gagal!|Gagal mengubah status.", error);
  }

  const { error: quotationListError, count } = await supabase
    .from("quotations")
    .select("*", { count: "exact" })
    .eq("agency_id", data.agency.id);

  if (quotationListError) {
    return internalServerError(res);
  }

  const agencyCode = (data.agency.agency_name as string)
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  const document_number = `QT/${agencyCode}/${formatDate(new Date().toISOString(), "yyyy")}/${(Number(count) + 1).toString().padStart(3, "0")}-V0`;

  const { data: quotationData, error: quotationError } = await supabase
    .from("quotations")
    .insert({
      document_number,
      version_number: 0,
      proposed_value: data.inquiry_budget,
      agency_id: data.agency.id,
      deal_id: id,
    })
    .select("id")
    .single();

  if (quotationError) {
    return responseError(
      res,
      400,
      "Edit gagal!|Gagal menyimpan quotation.",
      error,
    );
  }

  const { error: quotationItemError } = await supabase
    .from("quotation_items")
    .insert(
      data.default_items.map((item) => ({
        content_name: item.content_name,
        quantity: Number(item.quantity),
        agency_id: data.agency.id,
        quotation_id: quotationData.id,
      })),
    );

  if (quotationItemError) {
    return responseError(res, 400, "Edit gagal!|Gagal menyimpan SOW.", error);
  }

  return responseSuccess(
    res,
    200,
    `Stage selesai!|Stage diubah menjadi ${stageData.find((item) => item.value === stage)?.label}.`,
  );
}
