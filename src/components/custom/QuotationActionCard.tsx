import { Controller } from "react-hook-form";
import {
  Button,
  ButtonFlex,
  CurrencyInput,
  Flex,
  PercentInput,
} from "../shared";
import { QuotationStatus } from "@/utils/enums";
import useDealController from "@/controllers/useDealController";
import { useSelector } from "@tanstack/react-store";
import { loadingStore } from "@/stores/page.store";
import { Squircle } from "ldrs/react";
import "ldrs/react/Squircle.css";

type Props = {
  control: any;
  documentPath?: string | null;
  status: QuotationStatus | null;
  quotationId: string;
  onGenerate: () => void;
};

function QuotationActionCard({
  control,
  documentPath,
  status,
  quotationId,
  onGenerate,
}: Props) {
  const loadingState = useSelector(loadingStore);

  const { updateQuotationStatusService } = useDealController();

  return (
    <Flex className="border border-neutral-300 bg-white shadow-sm rounded-lg p-6 gap-6">
      <h2 className="text-neutral-900">Quotation untuk brand</h2>

      <p className="text-body-xs text-neutral-600">
        Sesuaikan scope penawaran, harga, dan potongan pajak. Generate dokumen
        sebelum mencatat pengiriman ke brand.
      </p>

      <Flex className="gap-3.5">
        <Controller
          control={control}
          name="proposed_value"
          rules={{
            required: "Harga penawaran harus diisi!",
            min: {
              value: 1,
              message: "Harga penawaran harus diisi!",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <CurrencyInput
              field={field}
              label="Harga Penawaran"
              required
              disabled={status === QuotationStatus["approved"]}
              error={error}
            />
          )}
        />

        <Controller
          control={control}
          name="tax_pct"
          rules={{
            required: "Harga penawaran harus diisi!",
          }}
          render={({ field, fieldState: { error } }) => (
            <PercentInput
              field={field}
              label="Potongan Pajak"
              required
              disabled={status === QuotationStatus["approved"]}
              error={error}
            />
          )}
        />
      </Flex>

      <Flex className="gap-3">
        <Button
          label="Generate Quotation"
          mode="secondary"
          size="large"
          onClick={onGenerate}
        />

        {documentPath && (
          <Button
            label="Review PDF"
            mode="outline"
            size="large"
            onClick={() =>
              window.open(documentPath, "_blank", "noopener,noreferrer")
            }
          />
        )}
      </Flex>

      {documentPath && (
        <Flex className="gap-3.5">
          <p className="text-body-xs text-neutral-600">
            Setelah brand merespons, catat hasilnya:
          </p>

          <Flex className="flex-row! flex-wrap items-center gap-2">
            <ButtonFlex
              className={`p-2 border border-neutral-400 rounded-lg hover:bg-accent-500 transition-colors duration-300 text-neutral-900 hover:text-white hover:border-accent-500 ${status === "revision" && "bg-accent-500 text-white"}`}
              disabled={loadingState}
              onClick={() =>
                updateQuotationStatusService({
                  id: quotationId,
                  body: { status: QuotationStatus["revision"] },
                })
              }
            >
              {loadingState ? (
                <Squircle
                  size="18"
                  stroke="3"
                  strokeLength="0.15"
                  bgOpacity="0.1"
                  speed="0.9"
                  color="var(--neutral-800)"
                />
              ) : (
                <p className="text-body-xs font-medium">Minta Revisi</p>
              )}
            </ButtonFlex>

            <ButtonFlex
              className={`p-2 border border-neutral-400 rounded-lg hover:bg-accent-500 transition-colors duration-300 text-neutral-900 hover:text-white hover:border-accent-500 ${status === "rejected" && "bg-accent-500 text-white"}`}
              disabled={loadingState}
              onClick={() =>
                updateQuotationStatusService({
                  id: quotationId,
                  body: { status: QuotationStatus["rejected"] },
                })
              }
            >
              {loadingState ? (
                <Squircle
                  size="18"
                  stroke="3"
                  strokeLength="0.15"
                  bgOpacity="0.1"
                  speed="0.9"
                  color="var(--neutral-800)"
                />
              ) : (
                <p className="text-body-xs font-medium">Ditolak</p>
              )}
            </ButtonFlex>

            <ButtonFlex
              className={`p-2 border border-neutral-400 rounded-lg hover:bg-accent-500 transition-colors duration-300 text-neutral-900 hover:text-white hover:border-accent-500 ${status === "approved" && "bg-accent-500 text-white"}`}
              disabled={loadingState}
              onClick={() =>
                updateQuotationStatusService({
                  id: quotationId,
                  body: { status: QuotationStatus["approved"] },
                })
              }
            >
              {loadingState ? (
                <Squircle
                  size="18"
                  stroke="3"
                  strokeLength="0.15"
                  bgOpacity="0.1"
                  speed="0.9"
                  color="var(--neutral-800)"
                />
              ) : (
                <p className="text-body-xs font-medium">Disetujui</p>
              )}
            </ButtonFlex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default QuotationActionCard;
