import { DealSOWInput } from "./deal.interface";

export interface ToastStateType {
  show: boolean;
  type: "success" | "failed";
  message: string;
}

export interface GenerateQuotationDataType {
  id: string;
  agency_name: string;
  campaign_name: string;
  brand: string;
  talent: string;
  target_date: string;
  version_number: number | null;
  document_number: string;
  sow: DealSOWInput[];
  proposed_value: number;
  tax_pct: number;
}

export interface GenerateQuotationStateType {
  show: boolean;
  data: GenerateQuotationDataType;
}
