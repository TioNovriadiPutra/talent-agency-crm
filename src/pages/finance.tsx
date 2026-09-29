import {
  Flex,
  MainContainer,
  SearchInput,
  Table,
  TablePagination,
} from "@/components/shared";
import useDealController from "@/controllers/useDealController";
import { convertNumberToCurrency } from "@/utils/client_helper";
import { dealBaruHeader } from "@/utils/page_data";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

function Finance() {
  const [currPage, setCurrPage] = useState(1);

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const searchInput = useWatch({
    control,
    name: "search",
  });

  const { useGetDealsService } = useDealController();

  const { finalData, isLoading } = useGetDealsService(currPage, searchInput);

  const onNext = () => setCurrPage((prev) => prev + 1);

  const onPrev = () => setCurrPage((prev) => prev - 1);

  return (
    <MainContainer>
      <Flex className="flex-1 border border-neutral-300 bg-white shadow-sm rounded-lg">
        <Flex className="flex-row! items-center justify-between p-6">
          <Flex className="gap-1.5">
            <h1 className="text-neutral-900">Finance</h1>

            <p className="text-body-s text-neutral-600">
              Quotation, invoice, pembayaran brand, dan payout talent
            </p>
          </Flex>
        </Flex>

        <div className="grid grid-cols-2 gap-4.5 px-6 pb-6">
          <Flex className="p-6 border border-neutral-300 rounded-lg">
            <p className="text-body-s text-neutral-600 mb-2">
              Invoice belum dibayar
            </p>

            <p className="text-body-l font-semibold text-neutral-900 mb-1.5">
              {convertNumberToCurrency(0)}
            </p>

            <p className="text-body-xs text-neutral-600">
              0 invoice menunggu pembayaran
            </p>
          </Flex>

          <Flex className="p-6 border border-neutral-300 rounded-lg">
            <p className="text-body-s text-neutral-600 mb-2">
              Payout belum selesai
            </p>

            <p className="text-body-l font-semibold text-neutral-900 mb-1.5">
              {convertNumberToCurrency(27300000)}
            </p>

            <p className="text-body-xs text-neutral-600">
              Pembayaran brand telah tercatat
            </p>
          </Flex>
        </div>

        <Flex className="flex-row! items-center justify-end px-6">
          <Controller
            control={control}
            name="search"
            render={({ field }) => <SearchInput field={field} />}
          />
        </Flex>

        <Flex className="p-3 bg-yellow-100 rounded-md mx-6 mt-2">
          <p className="text-body-xs text-yellow-600">
            Potongan pajak diatur per deal sebagai nilai contoh. Nominal dan
            perlakuan pajak perlu dikonfirmasi agency sebelum dipakai untuk
            transaksi nyata.
          </p>
        </Flex>

        <Flex className="flex-1 mt-2">
          <Table
            dataHeader={dealBaruHeader}
            data={finalData.table}
            withAction
            isLoading={isLoading}
          />

          <TablePagination
            paginationData={finalData.pagination}
            onNext={onNext}
            onPrev={onPrev}
          />
        </Flex>
      </Flex>
    </MainContainer>
  );
}

export default Finance;
