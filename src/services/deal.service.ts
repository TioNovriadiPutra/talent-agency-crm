import {
  DealAnalyticDTO,
  DealDetailDTO,
  DealDTO,
  DealInput,
} from "@/interfaces/deal.interface";
import { MetaResType, ResType } from "@/interfaces/res.interface";
import { fetchAPI } from "@/utils/client_helper";

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
