import { PHONE_REGEX } from "@/constants/common";
import * as yup from "yup";

const changeGenerateProfileSchema = yup.object({
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "Số điện thoại không hợp lệ.")
    .required("Số điện thoại là trường bắt buộc"),
  email: yup
    .string()
    .email("Vui lòng nhập địa chỉ email hợp lệ.")
    .required("Trường này không được bỏ trống"),
});

export default changeGenerateProfileSchema;
