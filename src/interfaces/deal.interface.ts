import { DealStatus } from "@/utils/enums";

export interface DealTalentDTO {
  talent_name: string;
}

export interface DealValueDTO {
  gross_value: number;
}

export interface DealDTO {
  id: string;
  campaign_name: string;
  brand_name: string;
  talent: DealTalentDTO;
  deal_value: DealValueDTO[];
  stage: DealStatus;
  target_date: string;
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
