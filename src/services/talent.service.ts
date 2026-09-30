import { DropdownType } from "@/interfaces/page.interface";
import { MetaResType, ResType } from "@/interfaces/res.interface";
import { TalentDTO, TalentInput } from "@/interfaces/talent.interface";
import { fetchAPI } from "@/utils/client_helper";

export async function saveTalent(body: TalentInput): Promise<ResType> {
  try {
    const response = await fetchAPI("/api/talent/new", "POST", body);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getTalents(
  page: number,
  search: string,
): Promise<ResType<MetaResType<TalentDTO[]>>> {
  try {
    const response = await fetchAPI(
      `/api/talent?page=${page}&search=${search}`,
      "GET",
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getTalentsDropdown(
  search: string,
): Promise<ResType<DropdownType[]>> {
  try {
    const response = await fetchAPI(
      `/api/talent/dropdown?search=${search}`,
      "GET",
    );

    return response;
  } catch (error) {
    throw error;
  }
}
