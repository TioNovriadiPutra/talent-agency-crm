import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

export function convertNumberToCurrency(val: number): string {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return formatter.format(val);
}

export function formatDate(
  value?: string,
  dateFormat: string = "dd MMM yyyy",
): string {
  if (value && value !== "-") {
    return format(parseISO(value), dateFormat, { locale: id });
  }

  return "-";
}

export async function fetchAPI<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: T,
) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    throw error;
  }
}
