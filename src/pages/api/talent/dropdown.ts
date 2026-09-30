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

  const { search } = req.query;

  const currSearch = typeof search === "string" ? search.trim() : "";

  const supabase = createSupabaseClient(req, res);

  let query = supabase
    .from("talents")
    .select("value:id, label:talent_name")
    .eq("agency_id", id);

  if (currSearch) {
    const pattern = `"${`%${currSearch}%`
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')}"`;

    query = query.or(
      `talent_name.ilike.${pattern},social_handle.ilike.${pattern}`,
    );
  }

  const { data, error } = await query.order("talent_name");

  if (error) {
    return internalServerError(res);
  }

  return fetchSuccess(res, "talent", data);
}
