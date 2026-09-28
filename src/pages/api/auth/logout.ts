import {
  internalServerError,
  methodNotAllowedError,
  responseSuccess,
} from "@/utils/server_helper";
import { createSupabaseClient } from "@/utils/supabase";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Cache-Control", "private, no-store");

  if (req.method !== "GET") {
    return methodNotAllowedError(res);
  }

  const supabase = createSupabaseClient(req, res);

  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) {
    return internalServerError(res);
  }

  return responseSuccess(res, 200, "Logout berhasil!|Selamat beristirahat.");
}
