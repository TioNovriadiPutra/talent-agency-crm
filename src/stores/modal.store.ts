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
