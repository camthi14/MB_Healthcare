import { PHONE_REGEX } from "@/constants/common";
import * as yup from "yup";

const loginSchema = yup.object({
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "Số điện thoại không hợp lệ.")
    .required("Số điện thoại là trường bắt buộc"),
  password: yup
    .string()
    .min(5, "Ít nhất 5 kí tự")
    .max(40, "Nhiều nhất 40 kí tự!")
    .required("Trường này không được bỏ trống"),
});

export default loginSchema;
