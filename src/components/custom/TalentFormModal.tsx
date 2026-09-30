import { AnimatePresence, motion } from "motion/react";
import {
  Button,
  ButtonFlex,
  Flex,
  ModalContainer,
  PercentInput,
  TextInput,
} from "../shared";
import { CloseCircle } from "iconsax-reactjs";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "@tanstack/react-store";
import { talentModalActions, talentModalStore } from "@/stores/modal.store";
import { loadingStore } from "@/stores/page.store";
import useTalentController from "@/controllers/useTalentController";

function TalentFormModal() {
  const modalState = useSelector(talentModalStore);
  const loadingState = useSelector(loadingStore);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      talent_name: "",
      social_handle: "",
      default_share_pct: "",
    },
  });

  const { saveTalentService } = useTalentController();

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
            className="flex flex-col min-w-98.75 bg-white border border-neutral-300 rounded-lg shadow-md"
          >
            <Flex className="flex-row! items-center justify-between px-6 py-4 border-b border-b-neutral-300">
              <p className="text-body-m font-semibold text-neutral-900">
                Talent Baru
              </p>

              <ButtonFlex
                className="size-8 justify-center rounded-md hover:bg-neutral-300 transition-colors duration-300"
                onClick={talentModalActions.closeModal}
              >
                <CloseCircle size={18} color="var(--neutral-600)" />
              </ButtonFlex>
            </Flex>

            <Flex className="px-9 py-4.5 gap-4.5">
              <Controller
                control={control}
                name="talent_name"
                rules={{
                  required: "Nama lengkap harus diisi!",
                  minLength: {
                    value: 1,
                    message: "Nama lengkap harus diisi!",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    field={field}
                    label="Nama Lengkap"
                    required
                    error={error}
                  />
                )}
              />

              <Controller
                control={control}
                name="social_handle"
                rules={{
                  required: "Social media harus diisi!",
                  minLength: {
                    value: 1,
                    message: "Social media harus diisi!",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    field={field}
                    label="Social Media"
                    required
                    error={error}
                  />
                )}
              />

              <Controller
                control={control}
                name="default_share_pct"
                rules={{
                  required: "Persentase bagian harus diisi!",
                  minLength: {
                    value: 1,
                    message: "Persentase bagian harus diisi!",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <PercentInput
                    field={field}
                    label="Persentase Bagian"
                    required
                    error={error}
                  />
                )}
              />
            </Flex>

            <Flex className="flex-row! items-center justify-end gap-3.5 px-6 py-3.5">
              <Button
                label="Batalkan"
                mode="outline"
                size="large"
                isLoading={loadingState}
                onClick={talentModalActions.closeModal}
              />

              <Button
                label="Simpan"
                mode="secondary"
                size="large"
                isLoading={loadingState}
                onClick={handleSubmit(saveTalentService)}
              />
            </Flex>
          </motion.div>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
}

export default TalentFormModal;
