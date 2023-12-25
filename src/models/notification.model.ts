export type NotificationType = {
  id?: number;
  actor_type: "patient" | "owner" | "doctor" | "employee";
  user_id: string;
  title: string;
  body: string;
  notification_type?: string;
  entity_name: string;
  entity_id: string;

  is_system: boolean | 0 | 1;
  is_read?: boolean | 0 | 1;

  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
};
