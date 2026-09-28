import { LoginDTO, LoginInput, MeDTO } from "@/interfaces/auth.interface";
import { ResType } from "@/interfaces/res.interface";
import { fetchAPI } from "@/utils/client_helper";

export async function login(body: LoginInput): Promise<ResType<LoginDTO>> {
  try {
    const response = await fetchAPI<LoginInput>(
      "/api/auth/login",
      "POST",
      body,
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function me(): Promise<ResType<MeDTO>> {
  try {
    const response = await fetchAPI("/api/auth/me", "GET");

    return response;
  } catch (error) {
    throw error;
  }
}

export async function logout(): Promise<ResType> {
  try {
    const response = await fetchAPI("/api/auth/logout", "GET");

    return response;
  } catch (error) {
    throw error;
  }
}
