import { ListBoxType, TableType } from "@/interfaces/page.interface";
import { convertNumberToCurrency, formatDate } from "./client_helper";

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
