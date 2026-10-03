import { ControllerRenderProps, FieldError } from "react-hook-form";
import { useState } from "react";
import Flex from "./Flex";

const numberFormatter = new Intl.NumberFormat("id-ID");

type Props = {
  field: ControllerRenderProps<any, any>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: FieldError;
};

function PercentInput({ field, label, required, disabled, error }: Props) {
  const [inputText, setInputText] = useState<string | null>(null);

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
        <Flex
          className={`flex-1 px-3 py-[11.5px] ${disabled && "bg-neutral-100"}`}
        >
          <input
            {...field}
            type="text"
            inputMode="decimal"
            aria-label={label}
            value={inputText ?? numberFormatter.format(field.value ?? 0)}
            placeholder="0"
            disabled={disabled}
            onFocus={() => {
              setInputText(String(field.value ?? 0).replace(".", ","));
            }}
            onBlur={() => {
              setInputText(null);
              field.onBlur();
            }}
            onChange={(event) => {
              const text = event.target.value.replace(/\./g, ",");

              if (!/^\d*(,\d*)?$/.test(text)) return;

              const value = Number(text.replace(",", "."));

              if (text === "," || Number.isFinite(value)) {
                setInputText(text);
                field.onChange(text === "," ? 0 : value);
              }
            }}
          />
        </Flex>

        <Flex className="bg-neutral-300 px-3 py-[11.5px] border-l border-l-neutral-400">
          <p className="text-body-s text-neutral-600">%</p>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PercentInput;
