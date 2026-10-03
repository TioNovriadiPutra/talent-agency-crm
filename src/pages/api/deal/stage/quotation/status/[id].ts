import { QuotationStatus } from "@/utils/enums";
import {
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

  const { status } = req.body;

  const supabase = createSupabaseClient(req, res);

  let finalData: { status: QuotationStatus; accepted_at?: string } = {
    status,
  };

  if (status === "approved") {
    finalData = {
      ...finalData,
      accepted_at: new Date().toISOString(),
    };
  }

  const { data, error } = await supabase
    .from("quotations")
    .update(finalData)
    .eq("id", id)
    .select("deal:deals ( id )")
    .single()
    .overrideTypes<{ deal: { id: string } }, { merge: false }>();

  if (error) {
    return responseError(
      res,
      400,
      "Edit gagal!|Gagal mengubah quotation.",
      error,
    );
  }

  return responseSuccess(
    res,
    200,
    "Edit berhasil!|Quotation berhasil diupdate.",
    { deal_id: data.deal.id },
  );
}
