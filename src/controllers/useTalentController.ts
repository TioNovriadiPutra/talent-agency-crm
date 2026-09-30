import { DropdownType, TalentTableType } from "@/interfaces/page.interface";
import { TalentInput } from "@/interfaces/talent.interface";
import {
  getTalents,
  getTalentsDropdown,
  saveTalent,
} from "@/services/talent.service";
import { talentModalActions } from "@/stores/modal.store";
import { authStore, loadingActions, toastActions } from "@/stores/page.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "@tanstack/react-store";

function useTalentController() {
  const agencyIdState = useSelector(authStore, (state) => state.agency_id);

  const queryClient = useQueryClient();

  const saveTalentMutation = useMutation({
    mutationKey: ["saveTalent"],
    mutationFn: (body: TalentInput) => saveTalent(body),
    onMutate: loadingActions.showLoading,
    onSettled: loadingActions.hideLoading,
    onSuccess: (response) => {
      toastActions.showToast("success", response.message);
      talentModalActions.closeModal();
      queryClient.invalidateQueries({ queryKey: ["getTalents"] });
    },
    onError: (error) => toastActions.showToast("failed", error.message),
  });

  const useGetTalentsService = (page: number, search: string) => {
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["getTalents", agencyIdState, page, search],
      queryFn: () => getTalents(page, search),
      enabled: Boolean(agencyIdState),
    });

    let finalData: TalentTableType = {
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
            title: item.talent_name,
            subTitle: `@${item.social_handle}`,
            percent: `${item.default_share_pct}%`,
            deal: item.recorded_deals[0].count,
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

  const useGetTalentsDropdownService = (search: string) => {
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["getTalentsDropdown", agencyIdState, search],
      queryFn: () => getTalentsDropdown(search),
      enabled: Boolean(agencyIdState),
    });

    let finalData: DropdownType[] = [];

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

  return {
    saveTalentService: (body: any) => saveTalentMutation.mutate(body),
    useGetTalentsService,
    useGetTalentsDropdownService,
  };
}

export default useTalentController;
