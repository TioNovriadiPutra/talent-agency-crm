import Flex from "./Flex";
import ButtonFlex from "./ButtonFlex";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";

function TablePagination() {
  return (
    <Flex className="flex-row! items-center justify-end px-6 py-3.5 bg-neutral-50 gap-4.5 rounded-b-lg">
      <p className="text-body-s text-neutral-500">
        Menampilkan <span className="font-medium">1-10</span> dari{" "}
        <span className="font-medium">32</span>
      </p>

      <Flex className="flex-row! items-center gap-2">
        <ButtonFlex className="size-8 justify-center border border-neutral-200 rounded-md bg-white hover:bg-neutral-200 transition-colors duration-300">
          <ArrowLeft2 size={16} color="var(--neutral-900)" />
        </ButtonFlex>

        <ButtonFlex className="size-8 justify-center border border-neutral-200 rounded-md bg-white hover:bg-neutral-200 transition-colors duration-300">
          <ArrowRight2 size={16} color="var(--neutral-900)" />
        </ButtonFlex>
      </Flex>
    </Flex>
  );
}

export default TablePagination;
