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
  if (req.method !== "GET") {
    return methodNotAllowedError(res);
  }

  const { id } = req.query;

  const supabase = createSupabaseClient(req, res);

  const { data, error } = await supabase
    .from("deals")
    .select(
      "id, stage, talent:talents ( talent_name ), deal_value:deal_financials ( gross_value ), target_date, sow:deliverables ( content_name, quantity )",
    )
    .eq("id", id)
    .single();

  if (error) {
    return internalServerError(res);
  }

  return fetchSuccess(res, "deal", data);
}
