import { DealStatus } from "@/utils/enums";

export interface DealBrandDTO {
  name: string;
}

export interface DealTalentDTO {
  name: string;
}

export interface DealValueDTO {
  gross_value: number;
}

export interface DealDTO {
  id: string;
  campaign_name: string;
  brand: DealBrandDTO;
  talent: DealTalentDTO;
  deal_value: DealValueDTO;
  status: DealStatus;
  taget_date: string;
}

export interface DealAnalyticReceivableDTO {
  receivables: number;
  pendingInvoices: number;
}

export interface DealAnalyticDTO {
  totalDeals: number;
  activeDeals: number;
  pipelineValue: number;
  receivables: DealAnalyticReceivableDTO;
}

export interface DealDeliverableInput {
  content_name: string;
  quantity: number;
}

export interface DealInput {
  campaign_name: string;
  brand: string;
  talent: string;
  gross_value: number;
  target_date: string;
  deliverables: DealDeliverableInput[];
}
