import { dealBaruHeader } from "@/utils/page_data";
import { ButtonFlex, Flex } from "../shared";
import { ArrowRight } from "iconsax-reactjs";
import { TableType } from "@/interfaces/page.interface";

type Props = {
  title: string;
  withAction?: boolean;
  data: TableType[];
  dataHeader: string[];
};

function TableDisplay({ title, withAction = false, data, dataHeader }: Props) {
  return (
    <Flex className="p-6 border border-neutral-200 rounded-lg gap-6">
      <p className="text-body-m font-semibold text-neutral-900">{title}</p>

      <table className="border-collapse">
        <thead>
          <tr>
            {dataHeader.map((item, index) => (
              <th
                key={index.toString()}
                className={`text-body-xs font-medium text-neutral-500 text-left p-4 bg-neutral-100 ${index === 0 ? "rounded-l-lg" : index === dealBaruHeader.length - 1 && !withAction ? "rounded-r-lg" : ""}`}
              >
                {item}
              </th>
            ))}

            {withAction && <th className="bg-neutral-100 rounded-r-lg p-4" />}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={index.toString()}
              className="hover:bg-neutral-50 transition-colors duration-300"
            >
              {item.data.map((item2, index2) => (
                <td
                  key={index2.toString()}
                  className="p-4 border-b border-b-neutral-200 text-body-s text-neutral-900"
                >
                  {item2.type === "double" ? (
                    <Flex className="gap-1">
                      {item2.value.split("|").map((item3, index3) => (
                        <p
                          key={index3.toString()}
                          className={`${index3 === 0 ? "font-bold" : "font-normal text-body-xs text-neutral-500"}`}
                        >
                          {item3}
                        </p>
                      ))}
                    </Flex>
                  ) : item2.type === "status" ? (
                    <Flex>
                      <Flex
                        className={`px-3.5 py-1 self-start ${item2.mode! === "warning" ? "bg-yellow-100" : item2.mode! === "success" ? "bg-green-100" : "bg-red-100"} rounded-full`}
                      >
                        <p
                          className={`text-body-s font-medium ${item2.mode! === "warning" ? "text-yellow-500" : item2.mode === "success" ? "text-green-500" : "text-red-500"}`}
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
                <td className="border-b border-b-neutral-200 p-4">
                  <Flex className="items-center">
                    <ButtonFlex className="size-8 justify-center border border-neutral-200 rounded-lg hover:bg-neutral-200 transition-colors duration-300">
                      <ArrowRight size={16} color="var(--neutral-900)" />
                    </ButtonFlex>
                  </Flex>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Flex>
  );
}

export default TableDisplay;
