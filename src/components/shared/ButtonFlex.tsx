import { ReactNode, Ref } from "react";

type Props = {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
  ref?: Ref<HTMLButtonElement>;
  disabled?: boolean;
};

function ButtonFlex({
  children,
  type = "button",
  className,
  onClick,
  ref,
  disabled = false,
}: Props) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={`flex items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonFlex;
