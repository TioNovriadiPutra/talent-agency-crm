import { ListBoxType } from "@/interfaces/page.interface";
import { Flex } from "../shared";

type Props = {
  title: string;
  data: ListBoxType[];
};

function ListBox({ title, data }: Props) {
  return (
    <Flex className="p-6 border border-neutral-200 rounded-lg gap-6">
      <p className="text-body-m font-semibold text-neutral-900">{title}</p>

      <Flex>
        {data.map((item, index) => (
          <Flex
            key={index.toString()}
            className="flex-row! justify-between p-6 border-b border-b-neutral-200"
          >
            <Flex className="flex-row! gap-3.5">
              <Flex className="pt-1">
                <Flex
                  className={`size-2 rounded-full ${item.status === "success" ? "bg-red-500" : item.status === "warning" ? "bg-yellow-500" : "bg-red-500"}`}
                />
              </Flex>

              <Flex className="gap-1">
                <p className="text-body-s font-bold">{item.title}</p>

                <p className="text-body-xs text-neutral-500">{item.subTitle}</p>
              </Flex>
            </Flex>

            <p className="text-body-s font-medium text-neutral-500">
              {item.team}
            </p>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default ListBox;
