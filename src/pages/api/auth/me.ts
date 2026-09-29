import {
  fetchSuccess,
  methodNotAllowedError,
  responseError,
} from "@/utils/server_helper";
import { createSupabaseClient } from "@/utils/supabase";
import { serializeCookieHeader } from "@supabase/ssr";
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

  const agencyCookie = serializeCookieHeader(
    "active_agency_id",
    membership.agency_id,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  );

  const existing = res.getHeader("Set-Cookie");
  const cookies = Array.isArray(existing)
    ? existing
    : existing
      ? [String(existing)]
      : [];

  res.setHeader("Set-Cookie", [...cookies, agencyCookie]);

  return fetchSuccess(res, "user", {
    ...membership,
    email: data.user.email,
  });
}
