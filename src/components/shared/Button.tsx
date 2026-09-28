import { Icon } from "iconsax-reactjs";
import ButtonFlex from "./ButtonFlex";
import { Squircle } from "ldrs/react";
import "ldrs/react/Squircle.css";

type Props = {
  type?: "submit" | "reset" | "button";
  size?: "default" | "large";
  mode?: "default" | "outline" | "danger";
  label: string;
  icon?: Icon;
  isLoading?: boolean;
  onClick?: () => void;
};

function Button({
  type = "button",
  size = "default",
  mode = "default",
  label,
  icon,
  isLoading = false,
  onClick,
}: Props) {
  const Icon = icon;

  return (
    <ButtonFlex
      type={type}
      disabled={isLoading}
      className={`justify-center px-3 ${size === "large" ? "py-2.75" : "py-1.75"} gap-2 ${mode === "outline" ? "bg-transparent border border-neutral-200 hover:bg-neutral-200" : mode === "danger" ? "bg-red-400 hover:bg-red-300" : "bg-neutral-900 hover:bg-neutral-700"} transition-colors duration-300 rounded-md`}
      onClick={onClick}
    >
      {isLoading ? (
        <Squircle
          size="18"
          stroke="3"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="0.9"
          color={mode === "outline" ? "var(--neutral-800)" : "white"}
        />
      ) : (
        <>
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
        </>
      )}
    </ButtonFlex>
  );
}

export default Button;
