import { DealStatus } from "@/utils/enums";

export interface DealBrandDTO {
  id: string;
  name: string;
}

export interface DealTalentDTO {
  id: string;
  name: string;
}

export interface DealDTO {
  id: string;
  campaign_name: string;
  brand: DealBrandDTO;
  talent: DealTalentDTO;
  deal_value: number;
  status: DealStatus;
  taget_date: string;
}
