import { useState } from "react";
import Flex from "./Flex";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { Eye, EyeSlash } from "iconsax-reactjs";
import ButtonFlex from "./ButtonFlex";

type Props = {
  field: ControllerRenderProps<any, any>;
  label?: string;
  type?: "default" | "password";
  required?: boolean;
  error?: FieldError;
};

function TextInput({ field, label, type = "default", required, error }: Props) {
  const [showPass, setShowPass] = useState(false);

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

      <Flex
        className={`flex-row! items-center px-3 py-[11.5px] border ${error ? "border-red-500" : "border-neutral-400"} rounded-md gap-3.5`}
      >
        <input
          {...field}
          type={type === "password" ? (showPass ? "text" : "password") : "text"}
          placeholder={
            label ? `Masukan ${label.toLowerCase()}...` : "Input disini..."
          }
        />

        {type === "password" && (
          <ButtonFlex onClick={() => setShowPass((prev) => !prev)}>
            {showPass ? (
              <Eye size={18} color="var(--neutral-600)" />
            ) : (
              <EyeSlash size={18} color="var(--neutral-600)" />
            )}
          </ButtonFlex>
        )}
      </Flex>
    </Flex>
  );
}

export default TextInput;
