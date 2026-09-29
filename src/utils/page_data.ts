import { ClipboardText, Element4, Moneys, Star1 } from "iconsax-reactjs";

export const dealBaruHeader = [
  "CAMPAIGN / BRAND",
  "TALENT",
  "NILAI DEAL",
  "STATUS",
  "TARGET",
];

export const sidebarMenu = [
  {
    label: "Dashboard",
    icon: Element4,
    dest: "/",
  },
  {
    label: "Pipeline Deal",
    icon: ClipboardText,
    dest: "/pipeline",
  },
  {
    label: "Talent",
    icon: Star1,
    dest: "/talent",
  },
  {
    label: "Finance",
    icon: Moneys,
    dest: "/finance",
  },
];

export const pipelineFilter = [
  {
    label: "Semua",
    value: "all",
  },
  {
    label: "Inquiry",
    value: "inquiry",
  },
  {
    label: "Quotation",
    value: "quotation",
  },
  {
    label: "Produksi",
    value: "production",
  },
  {
    label: "Invoice",
    value: "invoice",
  },
  {
    label: "Paid",
    value: "paid",
  },
];

export const deliverableHeader = [
  "Nama Content",
  "Jumlah",
  "Platform",
  "Tipe Content",
];
