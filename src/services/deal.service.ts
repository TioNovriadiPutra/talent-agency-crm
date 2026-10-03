import {
  ChangeStageInput,
  DealAnalyticDTO,
  DealDetailDTO,
  DealDTO,
  DealInput,
  GenerateQuotationInput,
} from "@/interfaces/deal.interface";
import { MetaResType, ResType } from "@/interfaces/res.interface";
import { fetchAPI } from "@/utils/client_helper";
import { QuotationStatus } from "@/utils/enums";

export async function getDealAnalytic(): Promise<ResType<DealAnalyticDTO>> {
  try {
    const response = await fetchAPI("/api/deal/analytic", "GET");

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getLatestDeals(): Promise<ResType<DealDTO[]>> {
  try {
    const response = await fetchAPI("/api/deal/latest", "GET");

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getDeals(
  page: number,
  search: string,
): Promise<ResType<MetaResType<DealDTO[]>>> {
  try {
    const response = await fetchAPI(
      `/api/deal?page=${page}&search=${search}`,
      "GET",
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function saveDeal(
  body: DealInput,
  email: string,
): Promise<ResType> {
  try {
    const response = await fetchAPI("/api/deal/new", "POST", {
      ...body,
      email,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getDealDetail(
  id: string,
): Promise<ResType<DealDetailDTO>> {
  try {
    const response = await fetchAPI(`/api/deal/${id}`, "GET");

    return response;
  } catch (error) {
    throw error;
  }
}

export async function changeStage(
  id: string,
  body: ChangeStageInput,
): Promise<ResType> {
  try {
    const response = await fetchAPI(
      `/api/deal/stage/quotation/${id}`,
      "PUT",
      body,
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function generateQuotation(
  id: string,
  body: GenerateQuotationInput,
): Promise<ResType<{ deal_id: string }>> {
  try {
    const response = await fetchAPI(
      `/api/deal/stage/quotation/generate/${id}`,
      "POST",
      body,
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateQuotationStatus(
  id: string,
  body: { status: QuotationStatus },
): Promise<ResType<{ deal_id: string }>> {
  try {
    const response = fetchAPI(
      `/api/deal/stage/quotation/status/${id}`,
      "PUT",
      body,
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function changeStageToDeal(
  id: string,
  body: { talent_share_pct: number },
): Promise<ResType> {
  try {
    const response = await fetchAPI(`/api/deal/stage/deal/${id}`, "PUT", body);

    return response;
  } catch (error) {
    throw error;
  }
}
