import { NextApiResponse } from "next";

export function methodNotAllowedError(res: NextApiResponse) {
  return res.status(405).json({
    success: false,
    message: "Method tidak diperbolehkan!|Harap hubungi contact support.",
    data: {},
  });
}

export function internalServerError(res: NextApiResponse) {
  return res.status(500).json({
    success: false,
    message: "Internal server error!|Terjadi kesalahan pada sistem.",
    data: {},
  });
}

export function responseError(
  res: NextApiResponse,
  status: number,
  message: string,
  data?: any,
) {
  return res.status(status).json({
    success: false,
    message,
    data: data || {},
  });
}

export function responseSuccess(
  res: NextApiResponse,
  status: 201 | 200,
  message: string,
  data?: any,
) {
  return res.status(status).json({
    success: true,
    message,
    data: data || {},
  });
}
