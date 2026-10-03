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
      "id, stage, talent:talents ( talent_name, default_share_pct ), inquiry_budget, target_date, inquiry_sow:inquiry_items ( content_name, quantity ), quotation:quotations ( id, document_number, version_number, proposed_value, tax_pct, status, generated_at, document_path, quotation_sow:quotation_items ( id, content_name, quantity, due_date ) ), deal_sow:deliverables ( id, content_name, quantity, due_date )",
    )
    .eq("id", id)
    .single();

  if (error) {
    return internalServerError(res);
  }

  return fetchSuccess(res, "deal", data);
}
