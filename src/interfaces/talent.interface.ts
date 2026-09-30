export interface TalentRecordedDealsDTO {
  count: number;
}

export interface TalentDTO {
  id: string;
  talent_name: string;
  social_handle: string;
  default_share_pct: number;
  recorded_deals: TalentRecordedDealsDTO[];
}

export interface TalentInput {
  talent_name: string;
  social_handle: string;
  default_share_pct: string;
}
