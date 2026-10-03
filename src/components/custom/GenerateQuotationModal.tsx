import { AnimatePresence, motion } from "motion/react";
import { Button, Flex, ModalContainer } from "../shared";
import { useSelector } from "@tanstack/react-store";
import {
  generateQuotationModalActions,
  generateQuotationModalStore,
} from "@/stores/modal.store";
import { convertNumberToCurrency, formatDate } from "@/utils/client_helper";
import { loadingStore } from "@/stores/page.store";
import useDealController from "@/controllers/useDealController";

function GenerateQuotationModal() {
  const modalState = useSelector(generateQuotationModalStore);
  const loadingState = useSelector(loadingStore);

  const tax =
    modalState.data.tax_pct > 0
      ? (modalState.data.proposed_value * modalState.data.tax_pct) / 100
      : 0;
  const afterTax = modalState.data.proposed_value - tax;

  const { generateQuotationService } = useDealController();

  return (
    <AnimatePresence>
      {modalState.show && (
        <ModalContainer>
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0,
            }}
            className="flex flex-col w-200 bg-white rounded-lg shadow-sm p-6 gap-6 max-h-[calc(100dvh-48px)] overflow-y-auto"
          >
            <Flex className="flex-row! items-center justify-between border-b border-neutral-300 pb-4">
              <Flex className="gap-2">
                <p className="text-body-s text-accent-500 font-semibold">
                  {modalState.data.agency_name.toUpperCase()}
                </p>

                <h1 className="text-neutral-900">Brand Quotation</h1>
              </Flex>

              <p className="text-body-xs text-neutral-600">
                {formatDate(new Date().toISOString(), "dd MMMM yyyy")}
              </p>
            </Flex>

            <div className="grid grid-cols-2 gap-6">
              <Flex className="gap-1">
                <p className="text-body-xs text-neutral-600">
                  DITUJUKAN KEPADA
                </p>

                <p className="text-body-m font-semibold text-neutral-900">
                  {modalState.data.brand}
                </p>
              </Flex>

              <Flex className="gap-1">
                <p className="text-body-xs text-neutral-600">CAMPAIGN</p>

                <p className="text-body-m font-semibold text-neutral-900">
                  {modalState.data.campaign_name}
                </p>
              </Flex>

              <Flex className="gap-1">
                <p className="text-body-xs text-neutral-600">TALENT</p>

                <p className="text-body-m font-semibold text-neutral-900">
                  {modalState.data.talent}
                </p>
              </Flex>

              <Flex className="gap-1">
                <p className="text-body-xs text-neutral-600">TARGET SELESAI</p>

                <p className="text-body-m font-semibold text-neutral-900">
                  {formatDate(modalState.data.target_date)}
                </p>
              </Flex>
            </div>

            <Flex>
              <table className="border-collapse">
                <thead>
                  <tr>
                    <th className="text-body-xs font-medium text-neutral-500 text-left p-4 bg-neutral-200 rounded-l-lg">
                      KONTEN
                    </th>

                    <th className="text-body-xs font-medium text-neutral-500 text-center p-4 bg-neutral-200">
                      JUMLAH
                    </th>

                    <th className="text-body-xs font-medium text-neutral-500 text-right p-4 bg-neutral-200 rounded-r-lg">
                      TENGGAT
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {modalState.data.sow.map((item, index) => (
                    <tr key={index.toString()}>
                      <td className="p-4 border-b border-b-neutral-300 text-body-s text-neutral-900">
                        {item.content_name}
                      </td>

                      <td className="p-4 border-b border-b-neutral-300 text-body-s text-neutral-900 text-center">
                        {item.quantity}x
                      </td>

                      <td className="p-4 border-b border-b-neutral-300 text-body-s text-neutral-900 text-right">
                        {formatDate(item.due_date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Flex className="flex-row! items-center justify-between py-4 border-b border-b-neutral-300">
                <p className="text-body-s text-neutral-600">Harga Penawaran</p>

                <p className="text-body-s text-neutral-900 font-semibold">
                  {convertNumberToCurrency(modalState.data.proposed_value)}
                </p>
              </Flex>

              <Flex className="flex-row! items-center justify-between py-4 border-b border-b-neutral-300">
                <p className="text-body-s text-neutral-600">
                  Potongan pajak ({modalState.data.tax_pct}%)
                </p>

                <p className="text-body-s text-neutral-900 font-semibold">
                  -{convertNumberToCurrency(tax)}
                </p>
              </Flex>

              <Flex className="flex-row! items-center justify-between py-4 border-b border-b-neutral-300">
                <p className="text-body-s text-neutral-600">
                  Estimasi setelah potongan pajak
                </p>

                <p className="text-body-l text-neutral-900 font-semibold">
                  {convertNumberToCurrency(afterTax)}
                </p>
              </Flex>
            </Flex>

            <Flex className="flex-row! items-center justify-end gap-3.5">
              <Button
                label="Tutup"
                mode="outline"
                size="large"
                isLoading={loadingState}
                onClick={generateQuotationModalActions.closeModal}
              />

              <Button
                label="Generate"
                mode="secondary"
                size="large"
                isLoading={loadingState}
                onClick={() =>
                  generateQuotationService({
                    id: modalState.data.id,
                    body: {
                      ...modalState.data,
                      tax,
                      afterTax,
                    },
                  })
                }
              />
            </Flex>
          </motion.div>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
}

export default GenerateQuotationModal;
