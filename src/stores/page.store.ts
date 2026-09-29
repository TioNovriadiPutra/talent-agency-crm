import { ToastStateType } from "@/interfaces/state.interface";
import { createStore } from "@tanstack/react-store";

export const loadingStore = createStore(false);
export const loadingActions = {
  showLoading() {
    loadingStore.setState(() => true);
  },
  hideLoading() {
    loadingStore.setState(() => false);
  },
};

export const toastStore = createStore({
  show: false,
  type: "failed",
  message: "Login gagal!|Email atau Password salah.",
} as ToastStateType);
export const toastActions = {
  showToast(type: "success" | "failed", message: string) {
    toastStore.setState(() => ({
      show: true,
      type,
      message,
    }));
  },
  hideToast() {
    toastStore.setState(() => ({
      show: false,
      type: "failed",
      message: "",
    }));
  },
};

export const authStore = createStore({
  role: "",
  email: "",
  agency_name: "",
  agency_id: "",
});
export const authActions = {
  setAuth(role: string, email: string, agency_name: string, agency_id: string) {
    authStore.setState(() => ({
      role,
      email,
      agency_name,
      agency_id,
    }));
  },
  resetAuth() {
    authStore.setState(() => ({
      role: "",
      email: "",
      agency_name: "",
      agency_id: "",
    }));
  },
};
