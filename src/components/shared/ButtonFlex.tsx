import { ReactNode, Ref } from "react";

type Props = {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
  ref?: Ref<HTMLButtonElement>;
};

function ButtonFlex({
  children,
  type = "button",
  className,
  onClick,
  ref,
}: Props) {
  return (
    <button
      ref={ref}
      type={type}
      className={`flex items-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonFlex;
