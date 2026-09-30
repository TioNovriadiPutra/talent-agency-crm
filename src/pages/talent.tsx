import { CardSkeleton } from "@/components/custom";
import {
  Button,
  Flex,
  MainContainer,
  SearchInput,
  TablePagination,
} from "@/components/shared";
import useTalentController from "@/controllers/useTalentController";
import { talentModalActions } from "@/stores/modal.store";
import { AddCircle, User } from "iconsax-reactjs";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

function Talent() {
  const [currPage, setCurrPage] = useState(1);

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const searchInput = useWatch({
    control,
    name: "search",
  });

  const { useGetTalentsService } = useTalentController();

  const { finalData, isLoading } = useGetTalentsService(currPage, searchInput);

  const onNext = () => setCurrPage((prev) => prev + 1);

  const onPrev = () => setCurrPage((prev) => prev - 1);

  return (
    <MainContainer>
      <Flex className="flex-1 border border-neutral-300 bg-white shadow-sm rounded-lg">
        <Flex className="flex-row! items-center justify-between p-6">
          <Flex className="gap-1.5">
            <h1 className="text-neutral-900">Talent</h1>

            <p className="text-body-s text-neutral-600">
              Profil talent dan persentase fee default.
            </p>
          </Flex>

          <Button
            size="large"
            mode="secondary"
            label="Tambah Talent"
            icon={AddCircle}
            onClick={talentModalActions.openModal}
          />
        </Flex>

        <Flex className="flex-row! items-center justify-end px-6">
          <Controller
            control={control}
            name="search"
            render={({ field }) => <SearchInput field={field} />}
          />
        </Flex>

        <Flex className="p-3 bg-yellow-100 rounded-md mx-6 mt-2">
          <p className="text-body-xs text-yellow-600">
            Persentase fee disalin ke deal saat inquiry dibuat, agar riwayat
            pembagian tidak berubah.
          </p>
        </Flex>

        <Flex className="flex-1">
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <div className="grid grid-cols-3 gap-4.5 px-6 pb-6 mt-2">
              {finalData.table.map((item, index) => (
                <Flex
                  key={index.toString()}
                  className="border border-neutral-300 rounded-lg p-6 hover:scale-105 hover:shadow-sm transition-all duration-200"
                >
                  <Flex className="flex-row! items-center gap-3 pb-5 border-b border-b-neutral-300 mb-3">
                    <Flex className="size-10 items-center justify-center bg-blue-100 rounded-lg">
                      <User size={18} color="var(--blue-500)" />
                    </Flex>

                    <Flex className="gap-1">
                      <p className="text-body-s font-medium text-neutral-900">
                        {item.title}
                      </p>

                      <p className="text-body-xs text-neutral-600">
                        {item.subTitle}
                      </p>
                    </Flex>
                  </Flex>

                  <Flex className="flex-row! justify-between">
                    <Flex className="items-start">
                      <p className="text-xs text-neutral-600">Deal Tercatat</p>

                      <p className="text-body-m font-medium text-neutral-900">
                        {item.deal}
                      </p>
                    </Flex>

                    <Flex className="items-start">
                      <p className="text-xs text-neutral-600">Bagian Talent</p>

                      <p className="text-body-m font-medium text-neutral-900">
                        {item.percent}
                      </p>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </div>
          )}
        </Flex>

        <TablePagination
          paginationData={finalData.pagination}
          onNext={onNext}
          onPrev={onPrev}
        />
      </Flex>
    </MainContainer>
  );
}

export default Talent;
