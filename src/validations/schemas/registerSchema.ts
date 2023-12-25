import { PHONE_REGEX } from "@/constants/common";
import * as yup from "yup";

const registerSchema = yup.object({
  first_name: yup
    .string()
    .min(1, "Ít nhất 2 kí tự")
    .max(40, "Nhiều nhất 40 kí tự!")
    .required("Tên không được bỏ trống."),
  birth_date: yup.string().required("Ngày sinh không được bỏ trống."),
  last_name: yup
    .string()
    .min(2, "Ít nhất 2 kí tự")
    .max(40, "Nhiều nhất 40 kí tự!")
    .required("Họ và chữ lót không được bỏ trống."),
  password: yup
    .string()
    .min(5, "Ít nhất 5 kí tự")
    .max(40, "Nhiều nhất 40 kí tự!")
    .required("Mật khẩu không được bỏ trống."),
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "Số điện thoại không hợp lệ.")
    .required("Số điện thoại là trường bắt buộc"),
});

export const addRelationshipSchema = yup.object({
  first_name: yup
    .string()
    .min(1, "Ít nhất 2 kí tự")
    .max(40, "Nhiều nhất 40 kí tự!")
    .required("Tên không được bỏ trống."),
  birth_date: yup.string().required("Ngày sinh không được bỏ trống."),
  last_name: yup
    .string()
    .min(2, "Ít nhất 2 kí tự")
    .max(40, "Nhiều nhất 40 kí tự!")
    .required("Họ và chữ lót không được bỏ trống."),
  relatives_id: yup.string().required("Mật khẩu không được bỏ trống."),
  relationship: yup.string().required("Không được bỏ trống"),
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "Số điện thoại không hợp lệ.")
    .required("Số điện thoại là trường bắt buộc"),
});

export default registerSchema;
