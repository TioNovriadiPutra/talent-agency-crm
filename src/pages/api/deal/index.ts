import {
  fetchSuccess,
  internalServerError,
  methodNotAllowedError,
  responseError,
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

  const { page, search } = req.query;

  const currPage = Number(page ?? 1);
  const pageSize = 10;
  const currSearch = typeof search === "string" ? search : "";

  if (!Number.isInteger(currPage) || currPage < 1) {
    return responseError(
      res,
      400,
      "Halaman tidak valid!|Harap hubungi contact support.",
    );
  }

  const from = (currPage - 1) * pageSize;

  const supabase = createSupabaseClient(req, res);

  let query = supabase
    .from("deals")
    .select(
      "id, campaign_name, brand:brands ( brand_name ), talent:talents ( talent_name ), deal_value:deal_financials ( gross_value ), stage, target_date",
      { count: "exact" },
    )
    .eq("agency_id", id);

  if (currSearch) {
    query = query.ilike("campaign_name", `%${currSearch}%`);
  }

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(from, from + pageSize - 1);

  if (error) {
    return internalServerError(res);
  }

  return fetchSuccess(res, "deal", {
    items: data ?? [],
    pagination: {
      page,
      pageSize,
      total: count ?? 0,
      totalPages: Math.ceil((count ?? 0) / pageSize),
    },
  });
}
