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
  value: string,
  dateFormat: string = "dd MMM yyyy",
): string {
  return format(parseISO(value), dateFormat, { locale: id });
}
