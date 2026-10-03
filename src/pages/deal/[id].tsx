import {
  CampaignInfoCard,
  QuotationActionCard,
  SOWCard,
  StageActionCard,
} from "@/components/custom";
import { ButtonFlex, Flex, MainContainer } from "@/components/shared";
import useDealController from "@/controllers/useDealController";
import { DealDetailInput } from "@/interfaces/deal.interface";
import { generateQuotationModalActions } from "@/stores/modal.store";
import { authStore, loadingStore } from "@/stores/page.store";
import { DealStatus } from "@/utils/enums";
import { stageData } from "@/utils/page_data";
import { useSelector } from "@tanstack/react-store";
import { ArrowLeft2 } from "iconsax-reactjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function Deal() {
  const loadingState = useSelector(loadingStore);
  const agencyNameState = useSelector(authStore, (state) => state.agency_name);

  const router = useRouter();

  const { control, reset, handleSubmit } = useForm<DealDetailInput>({
    defaultValues: {
      proposed_value: 0,
      tax_pct: 0,
      deliverables: [],
    },
  });

  const { id, name, brand } = router.query;

  const { useGetDealDetailService } = useDealController();

  const { finalData } = useGetDealDetailService(id as string);

  const nextStage =
    stageData[
      stageData.findIndex((item) => item.value === finalData.stage) + 1
    ];

  useEffect(() => {
    if (
      finalData.stage === DealStatus["quotation"] ||
      finalData.stage === DealStatus["deal"]
    ) {
      reset({
        proposed_value: finalData.quotation[0].proposed_value,
        tax_pct: finalData.quotation[0].tax_pct || 0,
        deliverables: (finalData.stage === DealStatus["quotation"]
          ? finalData.quotation[0].quotation_sow
          : finalData.deal_sow
        ).map((item) => ({
          id: item.id,
          content_name: item.content_name,
          quantity: item.quantity,
          due_date: item.due_date || "",
        })),
      });
    }
  }, [finalData.stage, finalData.quotation, finalData.deal_sow, reset]);

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
          <CampaignInfoCard
            brand={brand as string}
            talent={finalData.talent.talent_name}
            budget={finalData.inquiry_budget}
            target={finalData.target_date}
            sow={finalData.inquiry_sow}
          />

          {finalData.stage !== DealStatus["inquiry"] && (
            <SOWCard
              control={control}
              stage={finalData.stage}
              status={finalData.quotation[0].status}
            />
          )}
        </Flex>

        <Flex className="gap-3.5">
          {finalData.stage === DealStatus["quotation"] && (
            <QuotationActionCard
              control={control}
              documentPath={finalData.quotation[0].document_path}
              status={finalData.quotation[0].status}
              quotationId={finalData.quotation[0].id}
              onGenerate={handleSubmit((data) =>
                generateQuotationModalActions.openModal({
                  id: finalData.quotation[0].id,
                  agency_name: agencyNameState,
                  campaign_name: name as string,
                  brand: name as string,
                  talent: finalData.talent.talent_name,
                  target_date: finalData.target_date,
                  version_number: finalData.quotation[0].version_number,
                  document_number: finalData.quotation[0].document_number,
                  sow: data.deliverables,
                  proposed_value: data.proposed_value,
                  tax_pct: data.tax_pct,
                }),
              )}
            />
          )}

          <StageActionCard
            id={id as string}
            nextStage={nextStage}
            isLoading={loadingState}
            talent_share_pct={finalData.talent.default_share_pct}
            showButton={
              finalData.stage === "quotation"
                ? finalData.quotation[0].status === "approved"
                : true
            }
          />
        </Flex>
      </div>
    </MainContainer>
  );
}

export default Deal;
