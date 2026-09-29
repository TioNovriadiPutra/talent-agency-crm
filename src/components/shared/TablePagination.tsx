import Flex from "./Flex";
import ButtonFlex from "./ButtonFlex";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import { PaginationType } from "@/interfaces/res.interface";

type Props = {
  paginationData: PaginationType;
  onNext: () => void;
  onPrev: () => void;
};

function TablePagination({ paginationData, onNext, onPrev }: Props) {
  const from = paginationData.total === 0 ? 0 : 10 * paginationData.page - 9;
  const to =
    paginationData.total === 0
      ? 0
      : paginationData.page * 10 > paginationData.total
        ? paginationData.total
        : paginationData.page * 10;

  return (
    <Flex className="flex-row! items-center justify-end px-6 py-3.5 bg-neutral-200 gap-4.5 rounded-b-lg">
      <p className="text-body-s text-neutral-600">
        Menampilkan{" "}
        <span className="font-medium">
          {from}-{to}
        </span>{" "}
        dari <span className="font-medium">{paginationData.total}</span>
      </p>

      <Flex className="flex-row! items-center gap-2">
        <ButtonFlex
          disabled={paginationData.page <= 1}
          className="size-8 justify-center border border-neutral-400 rounded-md bg-white hover:bg-neutral-300 transition-colors duration-300"
          onClick={onPrev}
        >
          <ArrowLeft2 size={16} color="var(--neutral-900)" />
        </ButtonFlex>

        <ButtonFlex
          disabled={paginationData.page >= paginationData.totalPages}
          className="size-8 justify-center border border-neutral-400 rounded-md bg-white hover:bg-neutral-300 transition-colors duration-300"
          onClick={onNext}
        >
          <ArrowRight2 size={16} color="var(--neutral-900)" />
        </ButtonFlex>
      </Flex>
    </Flex>
  );
}

export default TablePagination;
