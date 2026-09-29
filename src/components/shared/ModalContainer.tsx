import { ReactNode } from "react";
import Flex from "./Flex";

type Props = {
  children: ReactNode;
};

function ModalContainer({ children }: Props) {
  return (
    <Flex className="absolute inset-0 z-50 bg-[rgba(23,23,23,0.3)] items-center justify-center">
      {children}
    </Flex>
  );
}

export default ModalContainer;
