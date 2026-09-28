import { Button, Flex, MainContainer, SearchInput } from "@/components/shared";
import { talentData } from "@/utils/dummy_data";
import { AddCircle } from "iconsax-reactjs";
import { Controller, useForm } from "react-hook-form";

function Talent() {
  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  return (
    <MainContainer>
      <Flex className="flex-1 border border-neutral-200 rounded-lg overflow-hidden">
        <Flex className="flex-row! items-center justify-between p-6">
          <Flex className="gap-1.5">
            <h1 className="text-neutral-900">Talent</h1>

            <p className="text-body-s text-neutral-500">
              Profil talent dan persentase fee default.
            </p>
          </Flex>

          <Button size="large" label="Tambah Talent" icon={AddCircle} />
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

        <div className="grid grid-cols-3 gap-4.5 px-6 pb-6 mt-2">
          {talentData.map((item, index) => (
            <Flex
              key={index.toString()}
              className="border border-neutral-200 rounded-lg p-6 hover:scale-105 hover:shadow-sm transition-all duration-200"
            >
              <Flex className="flex-row! items-center gap-3 pb-5 border-b border-b-neutral-200 mb-3">
                <Flex className="size-10 items-center justify-center bg-blue-100 rounded-lg"></Flex>

                <Flex className="gap-1">
                  <p className="text-body-s font-medium text-neutral-900">
                    {item.title}
                  </p>

                  <p className="text-body-xs text-neutral-500">
                    {item.subTitle}
                  </p>
                </Flex>
              </Flex>

              <Flex className="flex-row! justify-between">
                <Flex className="items-start">
                  <p className="text-xs text-neutral-500">Deal Tercatat</p>

                  <p className="text-body-m font-medium text-neutral-900">
                    {item.deal}
                  </p>
                </Flex>

                <Flex className="items-start">
                  <p className="text-xs text-neutral-500">Bagian Talent</p>

                  <p className="text-body-m font-medium text-neutral-900">
                    {item.percent}
                  </p>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </div>
      </Flex>
    </MainContainer>
  );
}

export default Talent;
