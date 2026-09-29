import { Flex } from "../shared";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AnalyticSkeleton() {
  return (
    <Flex className="flex-row! gap-4.5">
      {Array.from({ length: 3 }).map((_, index) => (
        <Flex key={index.toString()} className="flex-1">
          <Skeleton className="w-full h-29" style={{ borderRadius: 8 }} />
        </Flex>
      ))}
    </Flex>
  );
}

export default AnalyticSkeleton;
