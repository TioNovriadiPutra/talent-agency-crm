import { ReactNode } from "react";
import Flex from "./Flex";

type Props = {
  children: ReactNode;
  className?: string;
};

function MainContainer({ children, className }: Props) {
  return (
    <Flex
      className={`grow basis-0 p-6 gap-3.5 xl:w-255 xl:self-center overflow-auto ${className}`}
    >
      {children}
    </Flex>
  );
}

export default MainContainer;
