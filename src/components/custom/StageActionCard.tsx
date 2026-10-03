import { ArrowRight } from "iconsax-reactjs";
import { Button, Flex } from "../shared";
import useDealController from "@/controllers/useDealController";
import { DropdownType } from "@/interfaces/page.interface";
import { DealStatus } from "@/utils/enums";

type Props = {
  id: string;
  nextStage: DropdownType;
  isLoading: boolean;
  talent_share_pct: number;
  showButton?: boolean;
};

function StageActionCard({
  id,
  nextStage,
  isLoading,
  talent_share_pct,
  showButton = true,
}: Props) {
  const { changeStageService, changeStageToDealService } = useDealController();

  return (
    <Flex className="border border-neutral-300 bg-white shadow-sm rounded-lg p-6 gap-6">
      <h2 className="text-neutral-900">Langkah berikutnya</h2>

      <p className="text-body-xs text-neutral-600">
        {nextStage.value === DealStatus["deal"]
          ? "Generate dan kirim quotation. Setelah brand menyetujui, tahap Deal terbuka."
          : nextStage.value === DealStatus["production"]
            ? `Selesaikan handoff scope yang disetujui kepada Talent Team.`
            : "Periksa brief brand sebelum membuat scope penawaran agency."}
        {nextStage.value !== DealStatus["quotation"] && (
          <>
            <br />
            <br />
            <span>
              Penanggung jawab: Manager · lengkapi syarat di panel ini
            </span>
          </>
        )}
      </p>

      {showButton && (
        <Button
          label={`Lanjut ke ${nextStage.label}`}
          mode="secondary"
          size="large"
          icon={ArrowRight}
          prefix="right"
          isLoading={isLoading}
          onClick={() => {
            if (nextStage.value === DealStatus["deal"]) {
              changeStageToDealService({
                id: id as string,
                body: {
                  talent_share_pct,
                },
              });
            } else {
              changeStageService({
                id: id as string,
                body: {
                  stage: nextStage.value,
                },
              });
            }
          }}
        />
      )}
    </Flex>
  );
}

export default StageActionCard;
