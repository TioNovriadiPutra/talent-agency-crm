import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

function Flex({ children, className }: Props) {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
}

export default Flex;
