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
  res.setHeader("Cache-Control", "private, no-store");

  if (req.method !== "GET") {
    return methodNotAllowedError(res);
  }

  const supabase = createSupabaseClient(req, res);

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return responseError(
      res,
      401,
      "Akun tidak ditemukan!|Silahkan login terlebih dahulu.",
    );
  }

  const { data: membership, error: membershipError } = await supabase
    .from("agency_members")
    .select("agency_id, role, agency:agencies ( agency_name )")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (membershipError) {
    return responseError(
      res,
      500,
      "Internal server error!|Terjadi kesalahan pada sistem.",
    );
  }

  if (!membership) {
    return responseError(
      res,
      403,
      "Akses ditolak!|Akun belum terdaftar sebagai anggota agency.",
    );
  }

  return responseSuccess(
    res,
    200,
    "Data diambil!|Data user berhasil diambil.",
    {
      ...membership,
      email: data.user.email,
    },
  );
}
