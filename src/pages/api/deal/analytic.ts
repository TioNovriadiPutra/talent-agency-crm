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

  const { count: totalDeals, error: totalDealsError } = await supabase
    .from("deals")
    .select("*", { count: "exact", head: true })
    .eq("agency_id", id);

  if (totalDealsError) {
    return internalServerError(res);
  }

  const { count: activeDeals, error: activeDealsError } = await supabase
    .from("deals")
    .select("*", { count: "exact", head: true })
    .eq("agency_id", id)
    .in("stage", ["inquiry", "quotation", "production", "invoice"]);

  if (activeDealsError) {
    return internalServerError(res);
  }

  const { data: pipelineValue, error: pipelineValueError } = await supabase.rpc(
    "get_pipeline_value",
    {
      p_agency_id: id,
    },
  );

  if (pipelineValueError) {
    return internalServerError(res);
  }

  const { data: receivables, error: receivablesError } = await supabase.rpc(
    "get_receivables",
    {
      p_agency_id: id,
    },
  );

  if (receivablesError) {
    return internalServerError(res);
  }

  return fetchSuccess(res, "analytic", {
    totalDeals,
    activeDeals,
    pipelineValue,
    receivables,
  });
}
