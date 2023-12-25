export interface ISpecialist {
  id?: number;
  name: string;
  desc: string;
  photo?: string | null;
  time_chekup_avg: number;
  status?: "active" | "inactive" | "banned" | "waitting" | "reject";
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;

  price: number;
}
