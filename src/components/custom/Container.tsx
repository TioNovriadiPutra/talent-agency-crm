import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

function Container({ children, className }: Props) {
  return (
    <div className={`flex flex-col w-dvw h-dvh bg-neutral-100 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
