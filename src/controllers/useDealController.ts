import { DealAnalyticDTO } from "@/interfaces/deal.interface";
import { TablePaginationType, TableType } from "@/interfaces/page.interface";
import {
  getDealAnalytic,
  getDeals,
  getLatestDeals,
} from "@/services/deal.service";
import { authStore, toastActions } from "@/stores/page.store";
import { convertNumberToCurrency, formatDate } from "@/utils/client_helper";
import { DealStatus } from "@/utils/enums";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "@tanstack/react-store";

const dealStatusMode: Record<
  DealStatus,
  { label: string; color: "danger" | "warning" | "success" }
> = {
  [DealStatus.inquiry]: {
    label: "Inquiry",
    color: "danger",
  },
  [DealStatus.quotation]: {
    label: "Quotation",
    color: "danger",
  },
  [DealStatus.production]: {
    label: "Produksi",
    color: "warning",
  },
  [DealStatus.invoice]: {
    label: "Invoice",
    color: "warning",
  },
  [DealStatus.paid]: {
    label: "Paid",
    color: "success",
  },
};

function useDealController() {
  const agencyIdState = useSelector(authStore, (state) => state.agency_id);

  const useGetDealAnalyticService = () => {
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["getDealAnalytic", agencyIdState],
      queryFn: () => getDealAnalytic(),
      enabled: Boolean(agencyIdState),
    });

    let finalData: DealAnalyticDTO = {
      totalDeals: 0,
      activeDeals: 0,
      pipelineValue: 0,
      receivables: {
        receivables: 0,
        pendingInvoices: 0,
      },
    };

    if (!isLoading) {
      if (isError) {
        toastActions.showToast("failed", error.message);
      } else if (data) {
        finalData = data.data;
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  const useGetLatestDealsService = () => {
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["getLatestDeals", agencyIdState],
      queryFn: () => getLatestDeals(),
      enabled: Boolean(agencyIdState),
    });

    let finalData: TableType[] = [];

    if (!isLoading) {
      if (isError) {
        toastActions.showToast("failed", error.message);
      } else if (data) {
        finalData = data.data.map((item) => ({
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
              value: convertNumberToCurrency(item.deal_value.gross_value),
            },
            {
              type: "status",
              value: dealStatusMode[item.status].label,
              mode: dealStatusMode[item.status].color,
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
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  const useGetDealsService = (page: number, search: string) => {
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["getDeals", agencyIdState, page, search],
      queryFn: () => getDeals(page, search),
      enabled: Boolean(agencyIdState),
    });

    let finalData: TablePaginationType = {
      table: [],
      pagination: {
        page: 0,
        pageSize: 10,
        total: 0,
        totalPages: 0,
      },
    };

    if (!isLoading) {
      if (isError) {
        toastActions.showToast("failed", error.message);
      } else if (data) {
        finalData = {
          table: data.data.items.map((item) => ({
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
                value: convertNumberToCurrency(item.deal_value.gross_value),
              },
              {
                type: "status",
                value: dealStatusMode[item.status].label,
                mode: dealStatusMode[item.status].color,
              },
              {
                type: "date",
                value: formatDate(item.taget_date),
              },
            ],
            action: {
              type: "nav",
            },
          })),
          pagination: data.data.pagination,
        };
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    useGetDealAnalyticService,
    useGetLatestDealsService,
    useGetDealsService,
  };
}

export default useDealController;
