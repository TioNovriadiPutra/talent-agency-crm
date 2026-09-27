import { ListBoxType, TableType } from "@/interfaces/page.interface";
import { convertNumberToCurrency, formatDate } from "./client_helper";

export const dealBaruData: TableType[] = [
  {
    data: [
      {
        type: "double",
        value: "Serum Glow Launch|Lumi Beauty",
      },
      {
        type: "text",
        value: "Nadia Putri",
      },
      {
        type: "currency",
        value: convertNumberToCurrency(60000000),
      },
      {
        type: "status",
        value: "Produksi",
        mode: "warning",
      },
      {
        type: "date",
        value: formatDate(new Date().toISOString()),
      },
    ],
    action: {
      type: "nav",
    },
  },
  {
    data: [
      {
        type: "double",
        value: "Karsa Weekend|Kopi Karsa",
      },
      {
        type: "text",
        value: "Raka Pratama",
      },
      {
        type: "currency",
        value: convertNumberToCurrency(42000000),
      },
      {
        type: "status",
        value: "Paid",
        mode: "success",
      },
      {
        type: "date",
        value: formatDate(new Date().toISOString()),
      },
    ],
    action: {
      type: "nav",
    },
  },
  {
    data: [
      {
        type: "double",
        value: "Fall Collection|Aurelia Wear",
      },
      {
        type: "text",
        value: "Celine Marsha",
      },
      {
        type: "currency",
        value: convertNumberToCurrency(85000000),
      },
      {
        type: "status",
        value: "Quotation",
        mode: "danger",
      },
      {
        type: "date",
        value: formatDate(new Date().toISOString()),
      },
    ],
    action: {
      type: "nav",
    },
  },
  {
    data: [
      {
        type: "double",
        value: "Active Daily|Urban Fit",
      },
      {
        type: "text",
        value: "Nadia Putri",
      },
      {
        type: "currency",
        value: convertNumberToCurrency(35000000),
      },
      {
        type: "status",
        value: "Inquiry",
        mode: "danger",
      },
      {
        type: "date",
        value: formatDate(new Date().toISOString()),
      },
    ],
    action: {
      type: "nav",
    },
  },
];

export const perluPerhatianData: ListBoxType[] = [
  {
    status: "danger",
    title: "Posting Serum Glow",
    subTitle: "2 deliverible masih berjalan.",
    team: "Talent",
  },
  {
    status: "warning",
    title: "Quotation Aurelia Wear",
    subTitle: "Siapkan dokumen dari data deal.",
    team: "Finance",
  },
  {
    status: "success",
    title: "Payout Kopi Karsa",
    subTitle: "Pembayaran brand sudah tercatat.",
    team: "Finance",
  },
];

export const talentData = [
  {
    title: "Nadia Putri",
    subTitle: "@nadiaputri",
    deal: 2,
    percent: "70%",
  },
  {
    title: "Raka Pratama",
    subTitle: "@raka.pratama",
    deal: 1,
    percent: "65%",
  },
  {
    title: "Celine Marsha",
    subTitle: "@celinemarsha",
    deal: 3,
    percent: "70%",
  },
  {
    title: "Raka Pratama",
    subTitle: "@raka.pratama",
    deal: 1,
    percent: "65%",
  },
  {
    title: "Celine Marsha",
    subTitle: "@celinemarsha",
    deal: 3,
    percent: "70%",
  },
];

export const financeData: TableType[] = [
  {
    data: [
      {
        type: "double",
        value: "Karsa Weekend|Kopi Karsa",
      },
      {
        type: "text",
        value: "Raka Pratama",
      },
      {
        type: "currency",
        value: convertNumberToCurrency(42000000),
      },
      {
        type: "status",
        value: "Paid",
        mode: "success",
      },
      {
        type: "date",
        value: formatDate(new Date().toISOString()),
      },
    ],
    action: {
      type: "nav",
    },
  },
];
