import {
  internalServerError,
  methodNotAllowedError,
  responseError,
  responseSuccess,
} from "@/utils/server_helper";
import { createSupabaseClient } from "@/utils/supabase";
import { serializeCookieHeader } from "@supabase/ssr";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return methodNotAllowedError(res);
  }

  const { email, password } = req.body;

  const supabase = createSupabaseClient(req, res);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return responseError(res, 401, "Login gagal!|Email atau Password salah.");
  }

  const { data: memberships, error: membershipsError } = await supabase
    .from("agency_members")
    .select("agency_id, role, agency:agencies ( agency_name )")
    .eq("user_id", data.user.id);

  if (membershipsError) {
    return internalServerError(res);
  }

  const membership = memberships?.[0];

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

  return responseSuccess(
    res,
    200,
    "Login berhasil!|Selamat bekerja.",
    membership,
  );
}
