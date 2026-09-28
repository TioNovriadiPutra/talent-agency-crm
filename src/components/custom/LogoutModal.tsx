import { CloseCircle } from "iconsax-reactjs";
import { Button, ButtonFlex, Flex } from "../shared";
import { AnimatePresence, motion } from "motion/react";
import useAuthController from "@/controllers/useAuthController";
import { useSelector } from "@tanstack/react-store";
import { loadingStore } from "@/stores/page.store";

type Props = {
  modalState: boolean;
  closeModal: () => void;
};

function LogoutModal({ modalState, closeModal }: Props) {
  const loadingState = useSelector(loadingStore);

  const { logoutService } = useAuthController();

  return (
    <AnimatePresence>
      {modalState && (
        <Flex className="absolute inset-0 z-50 bg-[rgba(23,23,23,0.3)] items-center justify-center">
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0,
            }}
            className="flex flex-col w-95 bg-white rounded-lg shadow-md"
          >
            <Flex className="flex-row! items-center justify-between px-6 py-4 border-b border-b-neutral-200">
              <p className="text-body-m font-semibold text-neutral-900">
                Keluar
              </p>

              <ButtonFlex
                className="size-8 justify-center rounded-md hover:bg-neutral-200 transition-colors duration-300"
                onClick={closeModal}
              >
                <CloseCircle size={18} color="var(--neutral-400)" />
              </ButtonFlex>
            </Flex>

            <Flex className="px-6 py-4.5">
              <p className="text-body-s text-neutral-500">
                Apakah Anda yakin ingin keluar?
              </p>
            </Flex>

            <Flex className="flex-row! items-center justify-end gap-3.5 px-6 py-3.5">
              <Button
                label="Batalkan"
                mode="outline"
                size="large"
                isLoading={loadingState}
                onClick={closeModal}
              />

              <Button
                label="Keluar"
                mode="danger"
                size="large"
                isLoading={loadingState}
                onClick={() => logoutService(closeModal)}
              />
            </Flex>
          </motion.div>
        </Flex>
      )}
    </AnimatePresence>
  );
}

export default LogoutModal;
