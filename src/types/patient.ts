export interface patient {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  gender: undefined | "MALE" | "FEMALE" | "OTHER";
}

export interface UserState {
  address?: null | string;
  birth_date?: null | string;
  desc?: null | string;
  display_name: string;
  email: string;
  first_name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  id: number;
  last_name: string;
  phone_number: string;
  photo?: string | null;
  username: string;
}

export interface LoginPayload {
  phone_number: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  birth_date: string;
}

export type AddRelationshipPayload = Omit<RegisterPayload, "password"> & {
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_date: string;
  relatives_id: string;
  relationship: "mother" | "father" | "others" | "married_couple";
  gender: "MALE" | "FEMALE";
};

export interface VerifyCodePayload {
  api_key: string;
  user_id: string;
  otp: string;
}

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  email: string;
  gender: undefined | "MALE" | "FEMALE";
}

export interface ChangePasswordPayload {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PatientChangeProfilePayload {
  first_name: string;
  last_name: string;
  desc: string;
  birth_date: string;
  address: string;
  gender: undefined | "MALE" | "FEMALE";
  phone_number: string;
}

export interface GenerateChangePayload {
  email: string;
  phone_number: string;
}
