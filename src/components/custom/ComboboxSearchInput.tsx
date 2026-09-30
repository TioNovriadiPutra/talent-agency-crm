import { useEffect, useState } from "react";
import { Flex } from "../shared";
import { SearchNormal1 } from "iconsax-reactjs";
import { ControllerRenderProps } from "react-hook-form";

type Props = {
  field: ControllerRenderProps<any, any>;
};

function ComboboxSearchInput({ field }: Props) {
  const [inputValue, setInputValue] = useState(field.value ?? "");
  const { onChange } = field;

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(inputValue);
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue, onChange]);

  return (
    <Flex className="flex-row! items-center px-3 py-2.5 gap-2 border-b border-neutral-300">
      <SearchNormal1 size={18} color="var(--neutral-600)" />

      <input
        {...field}
        value={inputValue}
        placeholder="Cari disini..."
        onChange={(event) => setInputValue(event.target.value)}
      />
    </Flex>
  );
}

export default ComboboxSearchInput;
