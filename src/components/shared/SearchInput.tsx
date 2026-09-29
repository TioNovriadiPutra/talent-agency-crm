import { SearchNormal1 } from "iconsax-reactjs";
import Flex from "./Flex";
import { ControllerRenderProps } from "react-hook-form";

type Props = {
  field: ControllerRenderProps<
    {
      search: string;
    },
    "search"
  >;
};

function SearchInput({ field }: Props) {
  return (
    <Flex className="flex-row! items-center w-[320px] px-3 py-1.75 border border-neutral-400 rounded-md gap-2">
      <SearchNormal1 size={18} color="var(--neutral-600)" />

      <input {...field} placeholder="Cari disini..." />
    </Flex>
  );
}

export default SearchInput;
