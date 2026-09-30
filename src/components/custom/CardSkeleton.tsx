import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CardSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4.5 px-6 pb-6 mt-2">
      {Array.from({ length: 9 }).map((_, index) => (
        <Skeleton
          key={index.toString()}
          className="h-39.5"
          style={{
            borderRadius: 8,
          }}
        />
      ))}
    </div>
  );
}

export default CardSkeleton;
