import { TableType } from "@/interfaces/page.interface";
import Flex from "./Flex";
import ButtonFlex from "./ButtonFlex";
import { ArrowRight } from "iconsax-reactjs";
import TableSkeleton from "./TableSkeleton";
import TableEmptyState from "../custom/TableEmptyState";

type Props = {
  dataHeader: string[];
  data: TableType[];
  withAction?: boolean;
  isLoading?: boolean;
};

function Table({ dataHeader, data, withAction = false, isLoading }: Props) {
  return (
    <Flex className="flex-1 px-6">
      <table className="border-collapse">
        <thead>
          <tr>
            {dataHeader.map((item, index) => (
              <th
                key={index.toString()}
                className={`text-body-xs font-medium text-neutral-500 text-left p-4 bg-neutral-200 ${index === 0 ? "rounded-l-lg" : index === dataHeader.length - 1 && !withAction ? "rounded-r-lg" : ""}`}
              >
                {item}
              </th>
            ))}

            {withAction && <th className="bg-neutral-200 rounded-r-lg p-4" />}
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <TableSkeleton
              colSpan={Math.max(1, dataHeader.length + (withAction ? 1 : 0))}
            />
          ) : data.length === 0 ? (
            <TableEmptyState
              colSpan={Math.max(1, dataHeader.length + (withAction ? 1 : 0))}
            />
          ) : (
            data.map((item, index) => (
              <tr
                key={index.toString()}
                className="hover:bg-neutral-50 transition-colors duration-300"
              >
                {item.data.map((item2, index2) => (
                  <td
                    key={index2.toString()}
                    className="p-4 border-b border-b-neutral-300 text-body-s text-neutral-900"
                  >
                    {item2.type === "double" ? (
                      <Flex className="gap-1">
                        {item2.value.split("|").map((item3, index3) => (
                          <p
                            key={index3.toString()}
                            className={`${index3 === 0 ? "font-bold" : "font-normal text-body-xs text-neutral-600"}`}
                          >
                            {item3}
                          </p>
                        ))}
                      </Flex>
                    ) : item2.type === "status" ? (
                      <Flex>
                        <Flex
                          className={`px-3.5 py-1 self-start ${item2.mode! === "warning" ? "bg-yellow-100" : item2.mode! === "success" ? "bg-green-100" : "bg-accent-100"} rounded-full`}
                        >
                          <p
                            className={`text-body-s font-medium ${item2.mode! === "warning" ? "text-yellow-600" : item2.mode === "success" ? "text-green-500" : "text-accent-700"}`}
                          >
                            {item2.value}
                          </p>
                        </Flex>
                      </Flex>
                    ) : (
                      item2.value
                    )}
                  </td>
                ))}

                {withAction && (
                  <td className="border-b border-b-neutral-300 p-4">
                    <Flex className="items-center">
                      <ButtonFlex
                        className="size-8 justify-center border border-neutral-300 rounded-lg hover:bg-neutral-300 transition-colors duration-300"
                        onClick={item.action.onClick}
                      >
                        <ArrowRight size={16} color="var(--neutral-900)" />
                      </ButtonFlex>
                    </Flex>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Flex>
  );
}

export default Table;
