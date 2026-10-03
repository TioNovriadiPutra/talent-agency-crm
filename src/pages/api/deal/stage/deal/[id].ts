import { DealStatus } from "@/utils/enums";
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
  const agencyId = req.cookies.active_agency_id;

  if (req.method !== "PUT") {
    return methodNotAllowedError(res);
  }

  const { id } = req.query;

  const supabase = createSupabaseClient(req, res);

  const { talent_share_pct } = req.body;

  const { data, error } = await supabase
    .from("deals")
    .update({
      stage: DealStatus["deal"],
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(
      "quotation:quotations ( proposed_value, tax_pct, quotation_items:quotation_items ( id, content_name, quantity, due_date ) )",
    )
    .single();

  if (error) {
    if (error) {
      return responseError(
        res,
        400,
        "Edit gagal!|Gagal mengubah status.",
        error,
      );
    }
  }

  const { error: insertDealFinancialError } = await supabase
    .from("deal_financials")
    .insert({
      gross_value: data.quotation[0].proposed_value,
      tax_pct: data.quotation[0].tax_pct,
      agreed_talent_share_pct: Number(talent_share_pct),
      agency_id: agencyId,
      deal_id: id,
    });

  if (insertDealFinancialError) {
    return responseError(
      res,
      400,
      "Penyimpanan gagal!|Gagal menyimpan deal.",
      error,
    );
  }

  const { error: insertDeliverableError } = await supabase
    .from("deliverables")
    .insert(
      data.quotation[0].quotation_items.map((item) => ({
        content_name: item.content_name,
        quantity: item.quantity,
        due_date: item.due_date,
        agency_id: agencyId,
        deal_id: id,
        quotation_item_id: item.id,
      })),
    );

  if (insertDeliverableError) {
    return responseError(
      res,
      400,
      "Penyimpanan gagal!|Gagal menyimpan deal.",
      error,
    );
  }

  return responseSuccess(
    res,
    200,
    `Stage selesai!|Stage diubah menjadi Deal}.`,
  );
}
