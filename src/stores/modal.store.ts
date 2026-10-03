import {
  GenerateQuotationDataType,
  GenerateQuotationStateType,
} from "@/interfaces/state.interface";
import { createStore } from "@tanstack/react-store";

export const talentModalStore = createStore(false);
export const talentModalActions = {
  openModal() {
    talentModalStore.setState(() => true);
  },
  closeModal() {
    talentModalStore.setState(() => false);
  },
};

export const generateQuotationModalStore =
  createStore<GenerateQuotationStateType>({
    show: false,
    data: {
      id: "",
      agency_name: "",
      campaign_name: "",
      brand: "",
      talent: "",
      target_date: "",
      version_number: null,
      sow: [],
      proposed_value: 0,
      tax_pct: 0,
    },
  });
export const generateQuotationModalActions = {
  openModal(data: GenerateQuotationDataType) {
    generateQuotationModalStore.setState(() => ({
      show: true,
      data,
    }));
  },
  closeModal() {
    generateQuotationModalStore.setState(() => ({
      show: false,
      data: {
        id: "",
        agency_name: "",
        campaign_name: "",
        brand: "",
        talent: "",
        target_date: "",
        version_number: null,
        sow: [],
        proposed_value: 0,
        tax_pct: 0,
      },
    }));
  },
};
