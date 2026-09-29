import {
  fetchSuccess,
  internalServerError,
  methodNotAllowedError,
} from "@/utils/server_helper";
import { createSupabaseClient } from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.cookies.active_agency_id;

  if (req.method !== "GET") {
    return methodNotAllowedError(res);
  }

  const supabase = createSupabaseClient(req, res);

  const { data, error } = await supabase
    .from("deals")
    .select(
      "id, campaign_name, brand:brands ( brand_name ), talent:talents ( talent_name ), deal_value:deal_financials ( gross_value ), stage, target_date",
    )
    .eq("agency_id", id)
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  if (error) {
    return internalServerError(res);
  }

  return fetchSuccess(res, "deal", data);
}
