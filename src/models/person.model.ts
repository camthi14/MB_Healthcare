export interface IPerson {
  id?: string;
  display_name: string;
  password: string;
  email: string;
  email_verified_at?: string;
  phone_number: string;
  phone_verified_at?: string;
  remember_token?: string;
  photo?: string;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
  email_verify_token?: string | null;
}

export interface IPersonInformation {
  id?: number;
  first_name: string;
  last_name: string;
  birth_date?: string;
  address?: string;
  desc?: string;
  gender?: "MALE" | "FEMALE";
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
