import { ReactNode } from "react";
import Flex from "./Flex";

type Props = {
  children: ReactNode;
};

function MainContainer({ children }: Props) {
  return (
    <Flex className="grow basis-0 p-6 gap-3.5 bg-white xl:w-255 xl:self-center overflow-auto">
      {children}
    </Flex>
  );
}

export default MainContainer;
