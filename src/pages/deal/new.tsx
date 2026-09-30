import {
  Button,
  ButtonFlex,
  ComboboxInput,
  CurrencyInput,
  DateInput,
  Flex,
  MainContainer,
  QuantityInput,
  TextInput,
} from "@/components/shared";
import useDealController from "@/controllers/useDealController";
import useTalentController from "@/controllers/useTalentController";
import { DealInput } from "@/interfaces/deal.interface";
import { loadingStore } from "@/stores/page.store";
import { useSelector } from "@tanstack/react-store";
import { AddCircle, ArrowLeft2, Trash } from "iconsax-reactjs";
import { useRouter } from "next/router";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

function NewDeal() {
  const loadingState = useSelector(loadingStore);

  const router = useRouter();

  const { control, handleSubmit } = useForm<DealInput>({
    defaultValues: {
      campaign_name: "",
      brand: "",
      talent: "",
      gross_value: 0,
      target_date: "",
      deliverables: [
        {
          content_name: "",
          quantity: 0,
        },
      ],
    },
  });

  const { control: searchControl } = useForm({
    defaultValues: {
      talentSearch: "",
    },
  });

  const talentSearchInput = useWatch({
    control: searchControl,
    name: "talentSearch",
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "deliverables",
  });

  const { useGetTalentsDropdownService } = useTalentController();
  const { saveDealService } = useDealController();

  const { finalData, isLoading } =
    useGetTalentsDropdownService(talentSearchInput);

  return (
    <MainContainer>
      <Flex className="flex-row! items-center justify-between">
        <Flex className="flex-row! items-center gap-4">
          <ButtonFlex
            className="size-8 justify-center border border-neutral-400 rounded-md bg-neutral-0 hover:bg-neutral-300 transition-colors duration-300"
            onClick={() => router.back()}
          >
            <ArrowLeft2 size={16} color="var(--neutral-900)" />
          </ButtonFlex>

          <h2 className="text-neutral-900">Inquiry Baru</h2>
        </Flex>

        <Button
          label="Simpan Inquiry"
          mode="secondary"
          size="large"
          isLoading={loadingState}
          onClick={handleSubmit(saveDealService)}
        />
      </Flex>

      <Flex className="flex-1 border border-neutral-300 bg-white rounded-lg shadow-sm">
        <Flex className="p-6 gap-1.5">
          <h2 className="text-neutral-900">Rician</h2>

          <p className="text-body-s text-neutral-600">
            Catat brief masuk sebagai awal pipeline.
          </p>
        </Flex>

        <div className="grid grid-cols-2 gap-7 px-6 pb-3.5">
          <Controller
            control={control}
            name="brand"
            rules={{
              required: "Brand harus diisi!",
              minLength: {
                value: 1,
                message: "Brand harus diisi!",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextInput field={field} label="Brand" required error={error} />
            )}
          />

          <Controller
            control={control}
            name="talent"
            rules={{
              required: "Talent harus diisi!",
              minLength: {
                value: 1,
                message: "Talent harus diisi!",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <ComboboxInput
                field={field}
                label="Talent"
                required
                dropdownData={finalData}
                searchControl={searchControl}
                error={error}
                isLoading={isLoading}
              />
            )}
          />

          <Controller
            control={control}
            name="campaign_name"
            rules={{
              required: "Nama campaign harus diisi!",
              minLength: {
                value: 1,
                message: "Nama campaign harus diisi!",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                field={field}
                label="Nama Campaign"
                required
                error={error}
              />
            )}
          />

          <Controller
            control={control}
            name="gross_value"
            rules={{
              required: "Nilai deal harus diisi!",
              min: {
                value: 1,
                message: "Nilai deal harus diisi!",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <CurrencyInput
                field={field}
                label="Nilai Deal"
                required
                error={error}
              />
            )}
          />

          <Controller
            control={control}
            name="target_date"
            rules={{
              required: "Target selesai harus diisi!",
              minLength: {
                value: 10,
                message: "Target selesai harus diisi!",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <DateInput
                field={field}
                label="Target Selesai"
                required
                error={error}
              />
            )}
          />

          <Flex className="col-span-2 gap-2">
            <p className="text-body-s font-medium text-neutral-900">
              Deliverable <span className="text-red-600">*</span>
            </p>

            <Flex>
              <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_60px] px-3.5 py-4 bg-neutral-200 rounded-lg gap-2">
                <Flex className="col-span-2">
                  <p className="text-body-xs font-medium text-neutral-500">
                    Nama Content
                  </p>
                </Flex>

                <Flex>
                  <p className="text-body-xs font-medium text-neutral-500 text-center">
                    Jumlah
                  </p>
                </Flex>

                <Flex />
              </div>

              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[repeat(3,minmax(0,1fr))_60px] px-3.5 py-4 border-b border-b-neutral-300 gap-2"
                >
                  <Flex className="col-span-2">
                    <Controller
                      control={control}
                      rules={{
                        required: "Nama content harus diisi!",
                        minLength: {
                          value: 1,
                          message: "Nama content harus diisi!",
                        },
                      }}
                      name={`deliverables.${index}.content_name`}
                      render={({ field, fieldState: { error } }) => (
                        <TextInput field={field} error={error} />
                      )}
                    />
                  </Flex>

                  <Flex className="justify-center">
                    <Controller
                      control={control}
                      rules={{
                        required: "Jumlah harus diisi!",
                        min: {
                          value: 1,
                          message: "Jumlah harus diisi!",
                        },
                      }}
                      name={`deliverables.${index}.quantity`}
                      render={({ field, fieldState: { error } }) => (
                        <QuantityInput field={field} error={error} />
                      )}
                    />
                  </Flex>

                  <Flex className="items-center justify-center">
                    <ButtonFlex
                      className="size-8 justify-center border border-neutral-400 rounded-md text-neutral-900 hover:bg-red-100 hover:text-red-500 transition-colors duration-300"
                      onClick={() => remove(index)}
                    >
                      <Trash size={16} />
                    </ButtonFlex>
                  </Flex>
                </div>
              ))}

              <Flex className="items-center py-3">
                <ButtonFlex
                  className="gap-2 px-3 py-2.75 rounded-md hover:bg-neutral-300 transition-colors duration-300"
                  onClick={() =>
                    append({
                      content_name: "",
                      quantity: 0,
                    })
                  }
                >
                  <AddCircle size={18} color="var(--neutral-900)" />

                  <p className="text-body-s font-medium text-neutral-900">
                    Tambah
                  </p>
                </ButtonFlex>
              </Flex>
            </Flex>
          </Flex>
        </div>
      </Flex>
    </MainContainer>
  );
}

export default NewDeal;
