import { Controller, useFieldArray, useFormState } from "react-hook-form";
import {
  ButtonFlex,
  DateInput,
  Flex,
  QuantityInput,
  TextInput,
} from "../shared";
import { AddCircle, Trash } from "iconsax-reactjs";
import { DealDetailInput } from "@/interfaces/deal.interface";
import { DealStatus, QuotationStatus } from "@/utils/enums";

type Props = {
  control: any;
  stage: DealStatus;
  status: QuotationStatus | null;
};

function SOWCard({ control, stage, status }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "deliverables",
    rules: {
      validate: (items) => items.length > 0 || "Tambahkan minimal satu SOW!",
    },
  });

  const { errors } = useFormState<DealDetailInput>({
    control,
  });

  return (
    <Flex className="border border-neutral-300 bg-white shadow-sm rounded-lg p-6 gap-6">
      <Flex className="flex-row! items-end gap-2">
        <h2 className="text-neutral-900">Deliverables / SOW</h2>

        {errors.deliverables && errors.deliverables.root && (
          <p className="text-body-s text-red-600">
            ({errors.deliverables.root.message})
          </p>
        )}
      </Flex>

      {fields.map((item, index) => (
        <div
          key={item.id}
          className={`grid ${stage !== DealStatus["quotation"] ? "grid-cols-1" : "grid-cols-[repeat(1,minmax(0,1fr))_60px]"} px-3.5 py-4 border border-neutral-400 rounded-lg gap-3.5`}
        >
          <div className={"grid grid-cols-2 gap-3.5"}>
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
                  <TextInput
                    field={field}
                    error={error}
                    label="Nama Content"
                    disabled={
                      stage !== DealStatus["quotation"] ||
                      status === QuotationStatus["approved"]
                    }
                  />
                )}
              />
            </Flex>

            <Controller
              control={control}
              name={`deliverables.${index}.due_date`}
              rules={{
                required: "Tenggat harus diisi!",
                minLength: {
                  value: 1,
                  message: "Tenggat harus diisi!",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <DateInput
                  field={field}
                  error={error}
                  label="Tenggat"
                  disabled={
                    stage !== DealStatus["quotation"] ||
                    status === QuotationStatus["approved"]
                  }
                />
              )}
            />

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
                <QuantityInput
                  field={field}
                  error={error}
                  label="Jumlah"
                  disabled={
                    stage !== DealStatus["quotation"] ||
                    status === QuotationStatus["approved"]
                  }
                />
              )}
            />
          </div>

          {(stage === DealStatus["quotation"] ||
            status !== QuotationStatus["approved"]) && (
            <Flex className="items-center justify-center">
              <ButtonFlex
                className="size-8 justify-center border border-neutral-400 rounded-md text-neutral-900 hover:bg-red-100 hover:text-red-500 transition-colors duration-300"
                onClick={() => remove(index)}
              >
                <Trash size={16} />
              </ButtonFlex>
            </Flex>
          )}
        </div>
      ))}

      {(stage === DealStatus["quotation"] ||
        status !== QuotationStatus["approved"]) && (
        <Flex className="items-center py-3">
          <ButtonFlex
            className="gap-2 px-3 py-2.75 rounded-md hover:bg-neutral-300 transition-colors duration-300"
            onClick={() =>
              append({
                id: "",
                content_name: "",
                quantity: 0,
              })
            }
          >
            <AddCircle size={18} color="var(--neutral-900)" />

            <p className="text-body-s font-medium text-neutral-900">Tambah</p>
          </ButtonFlex>
        </Flex>
      )}
    </Flex>
  );
}

export default SOWCard;
