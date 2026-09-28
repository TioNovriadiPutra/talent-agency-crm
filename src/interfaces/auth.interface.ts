export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginAgencyDTO {
  agency_name: string;
}

export interface LoginDTO {
  agency_id: string;
  role: string;
  agency: LoginAgencyDTO;
}

export interface MeDTO extends LoginDTO {
  email: string;
}
