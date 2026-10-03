import {
  ChangeStageInput,
  DealAnalyticDTO,
  DealDetailDTO,
  DealInput,
  GenerateQuotationInput,
} from "@/interfaces/deal.interface";
import { TablePaginationType, TableType } from "@/interfaces/page.interface";
import {
  changeStage,
  changeStageToDeal,
  generateQuotation,
  getDealAnalytic,
  getDealDetail,
  getDeals,
  getLatestDeals,
  saveDeal,
  updateQuotationStatus,
} from "@/services/deal.service";
import { generateQuotationModalActions } from "@/stores/modal.store";
import { authStore, loadingActions, toastActions } from "@/stores/page.store";
import { convertNumberToCurrency, formatDate } from "@/utils/client_helper";
import { DealStatus, QuotationStatus } from "@/utils/enums";
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
  [DealStatus.deal]: {
    label: "Deal",
    color: "success",
  },
  [DealStatus.production]: {
    label: "Produksi",
    color: "warning",
  },
  [DealStatus.invoice]: {
    label: "Invoice",
    color: "danger",
  },
  [DealStatus.paid]: {
    label: "Paid",
    color: "success",
  },
  [DealStatus.payout]: {
    label: "Payout",
    color: "success",
  },
  [DealStatus.cancelled]: {
    label: "Cancelled",
    color: "danger",
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
            onClick: () =>
              router.push(
                `/deal/${item.id}?name=${item.campaign_name}&brand=${item.brand_name}`,
              ),
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
              onClick: () =>
                router.push(
                  `/deal/${item.id}?name=${item.campaign_name}&brand=${item.brand_name}`,
                ),
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

  const useGetDealDetailService = (id: string) => {
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["getDealDetail", id],
      queryFn: () => getDealDetail(id),
    });

    let finalData: DealDetailDTO = {
      id: "",
      stage: DealStatus["inquiry"],
      talent: {
        talent_name: "-",
        default_share_pct: 0,
      },
      inquiry_budget: 0,
      target_date: "-",
      inquiry_sow: [],
      quotation: [
        {
          id: "",
          proposed_value: 0,
          tax_pct: 0,
          status: null,
          generated_at: null,
          document_path: "",
          version_number: null,
          document_number: "",
          quotation_sow: [],
        },
      ],
      deal_sow: [],
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

  const changeStageMutation = useMutation({
    mutationKey: ["changeStage"],
    mutationFn: (data: { id: string; body: ChangeStageInput }) =>
      changeStage(data.id, data.body),
    onMutate: loadingActions.showLoading,
    onSettled: loadingActions.hideLoading,
    onSuccess: (response, variables) => {
      toastActions.showToast("success", response.message);
      queryClient.invalidateQueries({
        queryKey: ["getDealDetail", variables.id],
      });
    },
    onError: (error) => toastActions.showToast("failed", error.message),
  });

  const generateQuotationMutation = useMutation({
    mutationKey: ["generateQuotation"],
    mutationFn: (data: { id: string; body: GenerateQuotationInput }) =>
      generateQuotation(data.id, data.body),
    onMutate: loadingActions.showLoading,
    onSettled: loadingActions.hideLoading,
    onSuccess: (response) => {
      generateQuotationModalActions.closeModal();
      toastActions.showToast("success", response.message);
      queryClient.invalidateQueries({
        queryKey: ["getDealDetail", response.data.deal_id],
      });
    },
    onError: (error) => toastActions.showToast("failed", error.message),
  });

  const updateQuotationStatusMutation = useMutation({
    mutationKey: ["updateQuotationStatus"],
    mutationFn: (data: { id: string; body: { status: QuotationStatus } }) =>
      updateQuotationStatus(data.id, data.body),
    onMutate: loadingActions.showLoading,
    onSettled: loadingActions.hideLoading,
    onSuccess: (response) => {
      toastActions.showToast("success", response.message);
      queryClient.invalidateQueries({
        queryKey: ["getDealDetail", response.data.deal_id],
      });
    },
    onError: (error) => toastActions.showToast("failed", error.message),
  });

  const changeStageToDealMutation = useMutation({
    mutationKey: ["changeStateToDeal"],
    mutationFn: (data: { id: string; body: { talent_share_pct: number } }) =>
      changeStageToDeal(data.id, data.body),
    onMutate: loadingActions.showLoading,
    onSettled: loadingActions.hideLoading,
    onSuccess: (response, variables) => {
      toastActions.showToast("success", response.message);
      queryClient.invalidateQueries({
        queryKey: ["getDealDetail", variables.id],
      });
    },
    onError: (error) => toastActions.showToast("failed", error.message),
  });

  return {
    useGetDealAnalyticService,
    useGetLatestDealsService,
    useGetDealsService,
    saveDealService: (body: any) => saveDealMutation.mutate(body),
    useGetDealDetailService,
    changeStageService: (data: { id: string; body: any }) =>
      changeStageMutation.mutate(data),
    generateQuotationService: (data: {
      id: string;
      body: GenerateQuotationInput;
    }) => generateQuotationMutation.mutate(data),
    updateQuotationStatusService: (data: {
      id: string;
      body: { status: QuotationStatus };
    }) => updateQuotationStatusMutation.mutate(data),
    changeStageToDealService: (data: {
      id: string;
      body: { talent_share_pct: number };
    }) => changeStageToDealMutation.mutate(data),
  };
}

export default useDealController;
