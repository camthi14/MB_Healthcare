import { ColorSchemas } from "@/constants/colors";
import { IEmployee } from "./employee.model";

export type BillStatus = "paid" | "unpaid" | "partially_paid" | "others";
export type PaymentForBill = "medicine" | "cost_exam" | "cost_cls";

export type BillType = {
  id?: string;
  employee_id?: string | null;
  booking_id?: string | null;
  examination_card_id: string;
  total_price: number;
  payment_for: PaymentForBill;
  deposit?: number;
  change?: number;
  price_received?: number;
  note?: string;
  status: BillStatus;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;

  dataEmployee?: IEmployee | null;
};

export const convertOptionsBill = (status: PaymentForBill) =>
  ({
    medicine: "Hóa đơn thuốc",
    cost_exam: "Hóa đơn dịch vụ",
    cost_cls: "Hóa đơn cận lâm sàng",
  }[status]);

export const convertPaymentStatus = (status: BillStatus) =>
  ({
    paid: "Đã thanh toán",
    unpaid: "Chưa thanh toán",
    partially_paid: "Thanh toán một phần",
    others: "Khác",
  }[status]);

export const convertPaymentStatusColors = (status: BillStatus) =>
  ({
    paid: ColorSchemas.green,
    unpaid: ColorSchemas.red,
    partially_paid: ColorSchemas.orange,
    others: ColorSchemas.yellow,
  }[status]);
