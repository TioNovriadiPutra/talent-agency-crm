import { Button, ButtonFlex, Flex, MainContainer } from "@/components/shared";
import useDealController from "@/controllers/useDealController";
import { convertNumberToCurrency, formatDate } from "@/utils/client_helper";
import { stageData } from "@/utils/page_data";
import { ArrowLeft2, ArrowRight } from "iconsax-reactjs";
import { useRouter } from "next/router";

function Deal() {
  const router = useRouter();

  const { id, name, brand } = router.query;

  const { useGetDealDetailService } = useDealController();

  const { finalData } = useGetDealDetailService(id as string);

  return (
    <MainContainer>
      <Flex className="flex-row! items-center gap-4">
        <ButtonFlex
          className="size-8 justify-center border border-neutral-400 rounded-md bg-neutral-0 hover:bg-neutral-300 transition-colors duration-300"
          onClick={() => router.back()}
        >
          <ArrowLeft2 size={16} color="var(--neutral-900)" />
        </ButtonFlex>

        <h2 className="text-neutral-900">{name}</h2>

        <Flex className="px-2.5 py-0.5 border border-neutral-400 rounded-full bg-white">
          <p className="text-body-xs font-semibold text-neutral-900">{brand}</p>
        </Flex>
      </Flex>

      <Flex className="border border-neutral-300 bg-white shadow-sm rounded-lg p-6 gap-6">
        <Flex className="flex-row! items-center justify-between">
          <h2 className="text-neutral-900">Pipeline per talent</h2>

          <p className="text-body-s text-neutral-600">Tahap 1 dari 5</p>
        </Flex>

        <Flex className="flex-row! items-center gap-2">
          {stageData.map((item, index) => {
            const activeIndex = stageData.findIndex(
              (item) => item.value === finalData.stage,
            );

            return (
              <Flex
                key={index.toString()}
                className={`px-3 py-1.5 rounded-md ${index === activeIndex ? "bg-accent-100" : index < activeIndex ? "bg-green-100" : "bg-neutral-300"}`}
              >
                <p
                  className={`text-body-s font-semibold ${index === activeIndex ? "text-accent-700" : index < activeIndex ? "text-green-600" : "text-neutral-600"}`}
                >
                  {item.label}
                </p>
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      <div className="grid grid-cols-3 gap-3.5">
        <Flex className="col-span-2 gap-3.5">
          <Flex className="border border-neutral-300 bg-white shadow-sm rounded-lg p-6 gap-6">
            <h2 className="text-neutral-900">Informasi campaign</h2>

            <div className="grid grid-cols-2 gap-6">
              <Flex className="gap-1">
                <p className="text-body-xs text-neutral-600">BRAND</p>

                <p className="text-body-m font-semibold text-neutral-900">
                  {brand}
                </p>
              </Flex>

              <Flex className="gap-1">
                <p className="text-body-xs text-neutral-600">TALENT</p>

                <p className="text-body-m font-semibold text-neutral-900">
                  {finalData.talent.talent_name}
                </p>
              </Flex>

              <Flex className="gap-1">
                <p className="text-body-xs text-neutral-600">HARGA PENAWARAN</p>

                <p className="text-body-m font-semibold text-neutral-900">
                  {convertNumberToCurrency(
                    finalData.deal_value.length === 0
                      ? 0
                      : finalData.deal_value[0].gross_value,
                  )}
                </p>
              </Flex>

              <Flex className="gap-1">
                <p className="text-body-xs text-neutral-600">TARGET SELESAI</p>

                <p className="text-body-m font-semibold text-neutral-900">
                  {formatDate(finalData.target_date)}
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
                  {finalData.sow.map((item, index) => (
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
        </Flex>

        <Flex className="gap-3.5">
          <Flex className="border border-neutral-300 bg-white shadow-sm rounded-lg p-6 gap-6">
            <h2 className="text-neutral-900">Langkah berikutnya</h2>

            <p className="text-body-xs text-neutral-600">
              Manager harap memeriksa brief, talent, dan estimasi sebelum
              membuat penawaran.
            </p>

            <Button
              label="Lanjut ke Quotation"
              mode="secondary"
              size="large"
              icon={ArrowRight}
              prefix="right"
            />
          </Flex>
        </Flex>
      </div>
    </MainContainer>
  );
}

export default Deal;
