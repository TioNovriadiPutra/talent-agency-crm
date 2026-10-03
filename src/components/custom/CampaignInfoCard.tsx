import { convertNumberToCurrency, formatDate } from "@/utils/client_helper";
import { Flex } from "../shared";
import { DealDetailSOWDTO } from "@/interfaces/deal.interface";

type Props = {
  brand: string;
  talent: string;
  budget: number;
  target: string;
  sow: DealDetailSOWDTO[];
};

function CampaignInfoCard({ brand, talent, budget, target, sow }: Props) {
  return (
    <Flex className="border border-neutral-300 bg-white shadow-sm rounded-lg p-6 gap-6">
      <h2 className="text-neutral-900">Informasi campaign</h2>

      <div className="grid grid-cols-2 gap-6">
        <Flex className="gap-1">
          <p className="text-body-xs text-neutral-600">BRAND</p>

          <p className="text-body-m font-semibold text-neutral-900">{brand}</p>
        </Flex>

        <Flex className="gap-1">
          <p className="text-body-xs text-neutral-600">TALENT</p>

          <p className="text-body-m font-semibold text-neutral-900">{talent}</p>
        </Flex>

        <Flex className="gap-1">
          <p className="text-body-xs text-neutral-600">HARGA PENAWARAN</p>

          <p className="text-body-m font-semibold text-neutral-900">
            {convertNumberToCurrency(budget)}
          </p>
        </Flex>

        <Flex className="gap-1">
          <p className="text-body-xs text-neutral-600">TARGET SELESAI</p>

          <p className="text-body-m font-semibold text-neutral-900">
            {formatDate(target)}
          </p>
        </Flex>
      </div>

      <Flex className="h-px bg-neutral-300" />

      <Flex className="gap-3.5">
        <h2 className="text-neutral-900">Scope penawaran</h2>

        <table className="border-collapse">
          <thead>
            <tr className="border-b border-b-neutral-300">
              <th className="text-body-xs font-medium text-neutral-600 text-left p-3">
                Nama Content
              </th>

              <th className="text-body-xs font-medium text-neutral-600 p-3 text-right">
                Jumlah
              </th>
            </tr>
          </thead>

          <tbody>
            {sow.map((item, index) => (
              <tr
                key={index.toString()}
                className="border-b border-b-neutral-300"
              >
                <td className="text-body-s text-neutral-900 p-3">
                  {item.content_name}
                </td>

                <td className="text-body-s text-neutral-900 p-3 text-right">
                  {item.quantity} konten
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Flex>
    </Flex>
  );
}

export default CampaignInfoCard;
