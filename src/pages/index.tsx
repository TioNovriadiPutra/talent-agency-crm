import { AnalyticSkeleton, ListBox, TableDisplay } from "@/components/custom";
import { Flex, MainContainer } from "@/components/shared";
import useDealController from "@/controllers/useDealController";
import { convertNumberToCurrency } from "@/utils/client_helper";
import { perluPerhatianData } from "@/utils/dummy_data";
import { dealBaruHeader } from "@/utils/page_data";
import { ClipboardText, Clock, Moneys } from "iconsax-reactjs";

function Home() {
  const { useGetLatestDealsService, useGetDealAnalyticService } =
    useDealController();

  const { finalData: dealData, isLoading: dealLoading } =
    useGetLatestDealsService();
  const { finalData: analyticData, isLoading: analyticLoading } =
    useGetDealAnalyticService();

  return (
    <MainContainer>
      {analyticLoading ? (
        <AnalyticSkeleton />
      ) : (
        <Flex className="flex-row! gap-4.5">
          <Flex className="flex-row! items-center border border-neutral-200 rounded-lg h-29 flex-1 px-6 gap-6">
            <Flex className="size-14 bg-green-100 rounded-lg items-center justify-center">
              <ClipboardText
                size={32}
                variant="Bulk"
                color="var(--green-600)"
              />
            </Flex>

            <Flex className="flex-1">
              <p className="text-body-s font-medium text-neutral-500 mb-2">
                Total Deal
              </p>

              <p className="text-body-l font-semibold text-neutral-900 mb-1.5">
                {analyticData.totalDeals}
              </p>

              <p className="text-body-xs text-neutral-500">
                <span className="text-green-500 font-semibold">
                  {analyticData.activeDeals}
                </span>{" "}
                deal masih berjalan
              </p>
            </Flex>
          </Flex>

          <Flex className="flex-row! items-center border border-neutral-200 rounded-lg h-29 flex-1 px-6 gap-6">
            <Flex className="size-14 bg-blue-100 rounded-lg items-center justify-center">
              <Moneys size={32} variant="Bulk" color="var(--blue-600)" />
            </Flex>

            <Flex className="flex-1">
              <p className="text-body-s font-medium text-neutral-500 mb-2">
                Nilai Pipeline
              </p>

              <p className="text-body-l font-semibold text-neutral-900 mb-1.5">
                {convertNumberToCurrency(analyticData.pipelineValue)}
              </p>

              <p className="text-body-xs text-neutral-500">
                Sebelum potongan pajak
              </p>
            </Flex>
          </Flex>

          <Flex className="flex-row! items-center border border-neutral-200 rounded-lg h-29 flex-1 px-6 gap-6">
            <Flex className="size-14 bg-red-100 rounded-lg items-center justify-center">
              <Clock size={32} variant="Bulk" color="var(--red-600)" />
            </Flex>

            <Flex className="flex-1">
              <p className="text-body-s font-medium text-neutral-500 mb-2">
                Piutang
              </p>

              <p className="text-body-l font-semibold text-neutral-900 mb-1.5">
                {convertNumberToCurrency(analyticData.receivables.receivables)}
              </p>

              <p className="text-body-xs text-neutral-500">
                <span className="text-red-500 font-semibold">
                  {analyticData.receivables.pendingInvoices}
                </span>{" "}
                pending invoice
              </p>
            </Flex>
          </Flex>
        </Flex>
      )}

      <TableDisplay
        title="Deal Terbaru"
        withAction
        data={dealData}
        dataHeader={dealBaruHeader}
        isLoading={dealLoading}
      />

      <ListBox title="Perlu Perhatian" data={perluPerhatianData} />
    </MainContainer>
  );
}

export default Home;
