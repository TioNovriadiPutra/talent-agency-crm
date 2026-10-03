import { ControllerRenderProps, FieldError } from "react-hook-form";
import Flex from "./Flex";
import ButtonFlex from "./ButtonFlex";
import { Add, Minus } from "iconsax-reactjs";

type Props = {
  field: ControllerRenderProps<any, any>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: FieldError;
};

const numberFormatter = new Intl.NumberFormat("id-ID");

function QuantityInput({ field, label, required, disabled, error }: Props) {
  const onAdd = () => {
    field.onChange(field.value + 1);
  };

  const onMin = () => {
    if (field.value > 0) {
      field.onChange(field.value - 1);
    }
  };

  return (
    <Flex className="gap-2">
      {label && (
        <p className="text-body-s font-medium text-neutral-900">
          {label}{" "}
          {required && (
            <span className="text-red-600">
              * {error && `(${error.message})`}
            </span>
          )}
        </p>
      )}

      <Flex className="flex-row! items-center gap-2.5">
        <ButtonFlex
          disabled={disabled}
          className={`size-8 justify-center border border-neutral-400 rounded-md shrink-0 ${disabled && "bg-neutral-100"}`}
          onClick={onMin}
        >
          <Minus size={16} color="var(--neutral-900)" />
        </ButtonFlex>

        <Flex
          className={`min-w-0 flex-1 flex-row! items-center justify-center px-3 py-[11.5px] ${disabled && "bg-neutral-100"} border ${error ? "border-red-500" : "border-neutral-400"} rounded-md gap-3.5`}
        >
          <input
            {...field}
            type="text"
            inputMode="numeric"
            aria-label={label}
            disabled={disabled}
            value={numberFormatter.format(field.value ?? 0)}
            className="text-center"
            onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, "");
              const value = Number(digits);

              if (Number.isSafeInteger(value)) {
                field.onChange(value);
              }
            }}
          />
        </Flex>

        <ButtonFlex
          disabled={disabled}
          className={`size-8 justify-center border border-neutral-400 rounded-md shrink-0 ${disabled && "bg-neutral-100"}`}
          onClick={onAdd}
        >
          <Add size={16} color="var(--neutral-900)" />
        </ButtonFlex>
      </Flex>
    </Flex>
  );
}

export default QuantityInput;
