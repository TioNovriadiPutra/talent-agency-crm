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
  const id = req.cookies.active_agency_id;

  if (req.method !== "POST") {
    return methodNotAllowedError(res);
  }

  const { talent_name, social_handle, default_share_pct } = req.body;

  const supabase = createSupabaseClient(req, res);

  const { error } = await supabase.from("talents").insert({
    talent_name,
    social_handle,
    default_share_pct: Number(default_share_pct),
    agency_id: id,
  });

  if (error) {
    return responseError(
      res,
      400,
      "Penyimpanan gagal!|Gagal menyimpan talent.",
      error,
    );
  }

  return responseSuccess(
    res,
    201,
    "Talent tersimpan!|Talent telah disimpan di database.",
  );
}
