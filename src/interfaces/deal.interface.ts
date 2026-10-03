import { DealStatus, QuotationStatus } from "@/utils/enums";
import { GenerateQuotationDataType } from "./state.interface";

export interface DealTalentDTO {
  talent_name: string;
  default_share_pct: number;
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

export interface DealDetailSOWDTO {
  content_name: string;
  quantity: number;
}

export interface DealQuotationSOWDTO {
  id: string;
  content_name: string;
  quantity: number;
  due_date: string | null;
}

export interface DealQuotationDTO {
  id: string;
  proposed_value: number;
  tax_pct: number | null;
  status: QuotationStatus | null;
  generated_at: string | null;
  document_path: string | null;
  version_number: number | null;
  document_number: string;
  quotation_sow: DealQuotationSOWDTO[];
}

export interface DealDetailDTO {
  id: string;
  stage: DealStatus;
  talent: DealTalentDTO;
  inquiry_budget: number;
  target_date: string;
  inquiry_sow: DealDetailSOWDTO[];
  quotation: DealQuotationDTO[];
  deal_sow: DealQuotationSOWDTO[];
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

export interface ChangeStageInput {
  stage: DealStatus;
}

export interface DealSOWInput extends DealDeliverableInput {
  id: string;
  due_date: string;
}

export interface DealDetailInput {
  proposed_value: number;
  tax_pct: number;
  deliverables: DealSOWInput[];
}

export interface GenerateQuotationInput extends GenerateQuotationDataType {
  tax: number;
  afterTax: number;
}
