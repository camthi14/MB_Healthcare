import { PHONE_REGEX } from "@/constants/common";
import * as yup from "yup";

const bookingInfoCustomerSchema = yup.object({
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "Số điện thoại không hợp lệ.")
    .required("Số điện thoại là trường bắt buộc"),
  first_name: yup
    .string()
    .min(2, "Ít nhất 2 kí tự")
    .max(50, "Nhiều nhất 50 kí tự")
    .required("Tên là trường bắt buộc"),
  last_name: yup
    .string()
    .min(2, "Ít nhất 2 kí tự")
    .max(50, "Nhiều nhất 50 kí tự")
    .required("Họ và chữ lót là trường bắt buộc"),
  birth_date: yup.string().required("Đây là trường bắt buộc"),
  email: yup
    .string()
    .email("Vui lòng nhập địa chỉ email hợp lệ")
    .required("Đây là trường bắt buộc"),
});

export const bookingForSchema = yup.object({
  reason: yup.string().required("Lý do khám là trường bắt buộc"),
});

export default bookingInfoCustomerSchema;
