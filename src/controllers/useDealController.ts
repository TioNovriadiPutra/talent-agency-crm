import { DealDTO } from "@/interfaces/deal.interface";
import { DropdownType, TableType } from "@/interfaces/page.interface";
import { convertNumberToCurrency, formatDate } from "@/utils/client_helper";
import { DealStatus } from "@/utils/enums";

function useDealController() {
  const dealStatusMode: Record<DealStatus, "danger" | "warning" | "success"> = {
    [DealStatus.inquiry]: "danger",
    [DealStatus.quotation]: "danger",
    [DealStatus.deal]: "warning",
    [DealStatus.production]: "warning",
    [DealStatus.invoice]: "warning",
    [DealStatus.paid]: "success",
  };

  const useGetDealsService = (fetchData: DealDTO[], filter?: DropdownType) => {
    let finalData: TableType[] = [];

    if (fetchData) {
      const mapData: TableType[] = fetchData.map((item) => ({
        data: [
          {
            type: "double",
            value: `${item.campaign_name}|${item.brand.name}`,
          },
          {
            type: "text",
            value: item.talent.name,
          },
          {
            type: "currency",
            value: convertNumberToCurrency(item.deal_value),
          },
          {
            type: "status",
            value: item.status,
            mode: dealStatusMode[item.status],
          },
          {
            type: "date",
            value: formatDate(item.taget_date),
          },
        ],
        action: {
          type: "nav",
        },
      }));

      if (filter) {
        if (filter.value !== "all") {
          finalData = mapData.filter(
            (item) => item.data[3].value === filter.label,
          );
        } else {
          finalData = mapData;
        }
      } else {
        finalData = mapData;
      }
    }

    return {
      finalData,
    };
  };

  return {
    useGetDealsService,
  };
}

export default useDealController;
