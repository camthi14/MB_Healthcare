export interface ApiKey {
  id?: number;
  customer_id?: number;
  employee_id?: number;
  owner_id?: number;
  key: string;
  permissions?: "0000" | "1111" | "2222";
  ip_address: string;
  status?: "active" | "inactive" | "banned";
  created_at?: string;
  updated_at?: string;
}
