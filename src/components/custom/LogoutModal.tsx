import { CloseCircle } from "iconsax-reactjs";
import { Button, ButtonFlex, Flex, ModalContainer } from "../shared";
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
        <ModalContainer>
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
            className="flex flex-col w-95 bg-white rounded-lg shadow-sm"
          >
            <Flex className="flex-row! items-center justify-between px-6 py-4 border-b border-b-neutral-300">
              <p className="text-body-m font-semibold text-neutral-900">
                Keluar
              </p>

              <ButtonFlex
                className="size-8 justify-center rounded-md hover:bg-neutral-300 transition-colors duration-300"
                onClick={closeModal}
              >
                <CloseCircle size={18} color="var(--neutral-600)" />
              </ButtonFlex>
            </Flex>

            <Flex className="px-6 py-4.5">
              <p className="text-body-s text-neutral-600">
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
        </ModalContainer>
      )}
    </AnimatePresence>
  );
}

export default LogoutModal;
