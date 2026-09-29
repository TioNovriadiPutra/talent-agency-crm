import type {
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import Flex from "./Flex";

const numberFormatter = new Intl.NumberFormat("id-ID");

type Props<T extends FieldValues, TName extends FieldPath<T>> = {
  field: ControllerRenderProps<T, TName>;
  label: string;
  required?: boolean;
  error?: FieldError;
};

function CurrencyInput<T extends FieldValues, TName extends FieldPath<T>>({
  field,
  label,
  required,
  error,
}: Props<T, TName>) {
  return (
    <Flex className="gap-2">
      <p className="text-body-s font-medium text-neutral-900">
        {label}{" "}
        {required && (
          <span className="text-red-600">
            * {error && `(${error.message})`}
          </span>
        )}
      </p>

      <Flex
        className={`flex-row! items-center border ${error ? "border-red-500" : "border-neutral-400"} rounded-md overflow-hidden`}
      >
        <Flex className="bg-neutral-300 px-3 py-[11.5px] border-r border-r-neutral-400">
          <p className="text-body-s text-neutral-600">Rp</p>
        </Flex>

        <Flex className="flex-1 px-3 py-[11.5px]">
          <input
            {...field}
            type="text"
            inputMode="numeric"
            aria-label={label}
            value={numberFormatter.format(field.value ?? 0)}
            onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, "");
              const value = Number(digits);

              if (Number.isSafeInteger(value)) {
                field.onChange(value);
              }
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CurrencyInput;
