import { DealAnalyticDTO, DealInput } from "@/interfaces/deal.interface";
import { TablePaginationType, TableType } from "@/interfaces/page.interface";
import {
  getDealAnalytic,
  getDeals,
  getLatestDeals,
  saveDeal,
} from "@/services/deal.service";
import { authStore, loadingActions, toastActions } from "@/stores/page.store";
import { convertNumberToCurrency, formatDate } from "@/utils/client_helper";
import { DealStatus } from "@/utils/enums";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "@tanstack/react-store";
import { useRouter } from "next/router";

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
  const authState = useSelector(authStore);

  const router = useRouter();

  const queryClient = useQueryClient();

  const useGetDealAnalyticService = () => {
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["getDealAnalytic", authState.agency_id],
      queryFn: () => getDealAnalytic(),
      enabled: Boolean(authState.agency_id),
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
      queryKey: ["getLatestDeals", authState.agency_id],
      queryFn: () => getLatestDeals(),
      enabled: Boolean(authState.agency_id),
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
              value: `${item.campaign_name}|${item.brand_name}`,
            },
            {
              type: "text",
              value: item.talent.talent_name,
            },
            {
              type: "currency",
              value: convertNumberToCurrency(
                item.deal_value.length == 0
                  ? 0
                  : item.deal_value[0].gross_value,
              ),
            },
            {
              type: "status",
              value: dealStatusMode[item.stage].label,
              mode: dealStatusMode[item.stage].color,
            },
            {
              type: "date",
              value: formatDate(item.target_date),
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
      queryKey: ["getDeals", authState.agency_id, page, search],
      queryFn: () => getDeals(page, search),
      enabled: Boolean(authState.agency_id),
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
                value: `${item.campaign_name}|${item.brand_name}`,
              },
              {
                type: "text",
                value: item.talent.talent_name,
              },
              {
                type: "currency",
                value: convertNumberToCurrency(
                  item.deal_value.length === 0
                    ? 0
                    : item.deal_value[0].gross_value,
                ),
              },
              {
                type: "status",
                value: dealStatusMode[item.stage].label,
                mode: dealStatusMode[item.stage].color,
              },
              {
                type: "date",
                value: formatDate(item.target_date),
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

  const saveDealMutation = useMutation({
    mutationKey: ["saveDeal"],
    mutationFn: (body: DealInput) => saveDeal(body, authState.email),
    onMutate: loadingActions.showLoading,
    onSettled: loadingActions.hideLoading,
    onSuccess: async (response) => {
      toastActions.showToast("success", response.message);
      await router.replace("/pipeline");
      queryClient.invalidateQueries({ queryKey: ["getDeals"] });
    },
    onError: (error) => toastActions.showToast("failed", error.message),
  });

  return {
    useGetDealAnalyticService,
    useGetLatestDealsService,
    useGetDealsService,
    saveDealService: (body: any) => saveDealMutation.mutate(body),
  };
}

export default useDealController;
