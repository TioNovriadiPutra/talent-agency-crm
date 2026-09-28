import { LoginInput } from "@/interfaces/auth.interface";
import { login, logout, me } from "@/services/auth.service";
import { authActions, loadingActions, toastActions } from "@/stores/page.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

function useAuthController() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (body: LoginInput) => login(body),
    onMutate: () => loadingActions.showLoading(),
    onSettled: () => loadingActions.hideLoading(),
    onSuccess: async (response, variables) => {
      toastActions.showToast("success", response.message);
      authActions.setAuth(
        response.data.role,
        variables.email,
        response.data.agency.agency_name,
      );
      await router.replace("/");
    },
    onError: (error) => toastActions.showToast("failed", error.message),
  });

  const meMutation = useMutation({
    mutationKey: ["me"],
    mutationFn: () => me(),
    onSuccess: async (response) => {
      authActions.setAuth(
        response.data.role,
        response.data.email,
        response.data.agency.agency_name,
      );
    },
    onError: (error) => toastActions.showToast("failed", error.message),
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: (onClose: () => void) => logout(),
    onMutate: loadingActions.showLoading,
    onSettled: loadingActions.hideLoading,
    onSuccess: async (response, variables) => {
      toastActions.showToast("success", response.message);
      authActions.resetAuth();
      variables();
      await router.replace("/login");
    },
    onError: (error) => toastActions.showToast("failed", error.message),
  });

  return {
    loginService: (body: any) => loginMutation.mutate(body),
    meService: () => meMutation.mutate(),
    logoutService: (onClose: () => void) => logoutMutation.mutate(onClose),
  };
}

export default useAuthController;
