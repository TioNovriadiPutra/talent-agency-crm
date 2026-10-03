import { NextApiResponse } from "next";
import puppeteer from "puppeteer";

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

export function fetchSuccess(res: NextApiResponse, label: string, data: any) {
  return res.status(200).json({
    success: true,
    message: `Data diambil!|Data ${label} berhasil diambil.`,
    data,
  });
}

export async function generatePDF(html: string): Promise<Uint8Array> {
  let pdfBytes: Uint8Array;
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "load" });

    pdfBytes = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
  } finally {
    await browser.close();
  }

  return pdfBytes;
}
