import { DealDeliverableInput } from "@/interfaces/deal.interface";
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
  const id = req.cookies.active_agency_id;

  if (req.method !== "POST") {
    return methodNotAllowedError(res);
  }

  const {
    campaign_name,
    brand,
    talent,
    gross_value,
    target_date,
    deliverables,
    email,
  } = req.body;

  const supabase = createSupabaseClient(req, res);

  const { data, error } = await supabase
    .from("talents")
    .select("id, default_share_pct")
    .eq("id", talent)
    .single();

  if (error) {
    return internalServerError(res);
  }

  if (!data) {
    return responseError(
      res,
      404,
      "Data talent tidak ditemukan!|Daftarkan talent terlebih dahulu.",
    );
  }

  const { data: insertDeal, error: insertDealError } = await supabase
    .from("deals")
    .insert({
      campaign_name,
      created_by: email,
      target_date,
      brand_name: brand,
      agency_id: id,
      talent_id: talent,
    })
    .select("id")
    .single();

  if (insertDealError) {
    return responseError(
      res,
      400,
      "Penyimpanan gagal!|Gagal menyimpan deal.",
      error,
    );
  }

  const { error: insertFinancialError } = await supabase
    .from("deal_financials")
    .insert({
      gross_value: Number(gross_value),
      agreed_talent_share_pct: data.default_share_pct,
      deal_id: insertDeal.id,
      agency_id: id,
    });

  if (insertFinancialError) {
    return responseError(
      res,
      400,
      "Penyimpanan gagal!|Gagal menyimpan deal.",
      error,
    );
  }

  const { error: insertDeliverablesError } = await supabase
    .from("deliverables")
    .insert(
      deliverables.map((item: DealDeliverableInput) => ({
        content_name: item.content_name,
        quantity: Number(item.quantity),
        deal_id: insertDeal.id,
        agency_id: id,
      })),
    );

  if (insertDeliverablesError) {
    return responseError(
      res,
      400,
      "Penyimpanan gagal!|Gagal menyimpan deal.",
      error,
    );
  }

  return responseSuccess(
    res,
    201,
    "Deal tersimpan!|Deal telah disimpan di database.",
  );
}
