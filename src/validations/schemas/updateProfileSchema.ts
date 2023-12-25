import * as yup from "yup";

const updateProfileSchema = yup.object({
  first_name: yup
    .string()
    .min(2, "Ít nhất 2 kí tự")
    .max(50, "Quá dài!")
    .required("Trường này không được bỏ trống"),
  last_name: yup
    .string()
    .min(2, "Ít nhất 2 kí tự")
    .max(50, "Quá dài!")
    .required("Trường này không được bỏ trống"),
  email: yup
    .string()
    .email("Vui lòng nhập địa chỉ email hợp lệ.")
    .required("Trường này không được bỏ trống"),
  gender: yup.string().required("Trường này không được bỏ trống"),
});

export default updateProfileSchema;
