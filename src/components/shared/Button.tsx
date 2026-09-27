import { Icon } from "iconsax-reactjs";
import ButtonFlex from "./ButtonFlex";

type Props = {
  type?: "submit" | "reset" | "button";
  size?: "default" | "large";
  mode?: "default" | "outline";
  label: string;
  icon?: Icon;
};

function Button({
  type = "button",
  size = "default",
  mode = "default",
  label,
  icon,
}: Props) {
  const Icon = icon;

  return (
    <ButtonFlex
      type={type}
      className={`justify-center px-3 ${size === "large" ? "py-2.75" : "py-1.75"} gap-2 ${mode === "outline" ? "bg-transparent border border-neutral-200 hover:bg-neutral-200" : "bg-neutral-900 hover:bg-neutral-700"} transition-colors duration-300 rounded-md`}
    >
      {Icon && (
        <Icon
          size={18}
          color={mode === "outline" ? "var(--neutral-800)" : "white"}
        />
      )}

      <p
        className={`text-body-s font-medium ${mode === "outline" ? "text-neutral-800" : "text-white"}`}
      >
        {label}
      </p>
    </ButtonFlex>
  );
}

export default Button;
