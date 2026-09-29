import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Flex from "./Flex";

type Props = {
  colSpan: number;
  length?: number;
};

function TableSkeleton({ colSpan, length = 10 }: Props) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <Flex>
          {Array.from({ length }).map((_, index) => (
            <Skeleton key={index.toString()} className="h-14" />
          ))}
        </Flex>
      </td>
    </tr>
  );
}

export default TableSkeleton;
