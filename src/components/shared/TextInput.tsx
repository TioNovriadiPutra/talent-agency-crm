import { useState } from "react";
import Flex from "./Flex";
import { ControllerRenderProps } from "react-hook-form";
import { Eye, EyeSlash } from "iconsax-reactjs";
import ButtonFlex from "./ButtonFlex";

type Props = {
  field: ControllerRenderProps<any, any>;
  label: string;
  type?: "default" | "password";
};

function TextInput({ field, label, type = "default" }: Props) {
  const [showPass, setShowPass] = useState(false);

  return (
    <Flex className="gap-2">
      <p className="text-body-s font-medium text-neutral-900">{label}</p>

      <Flex className="flex-row! items-center px-3 py-[11.5px] border border-neutral-200 rounded-md gap-3.5">
        <input
          {...field}
          type={type === "password" ? (showPass ? "text" : "password") : "text"}
          placeholder={`Masukan ${label.toLowerCase()}...`}
        />

        {type === "password" && (
          <ButtonFlex onClick={() => setShowPass((prev) => !prev)}>
            {showPass ? (
              <Eye size={18} color="var(--neutral-500)" />
            ) : (
              <EyeSlash size={18} color="var(--neutral-500)" />
            )}
          </ButtonFlex>
        )}
      </Flex>
    </Flex>
  );
}

export default TextInput;
