import * as yup from "yup";

const changePasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(5, "Ít nhất 5 kí tự")
    .max(40, "Nhiều nhất 40 kí tự!")
    .required("Mật khẩu mới không được bỏ trống."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Mật khẩu nhập lại không giống.")
    .required("Vui lòng nhập lại mật khẩu"),
  password: yup
    .string()
    .min(5, "Ít nhất 5 kí tự")
    .max(40, "Nhiều nhất 40 kí tự!")
    .required("Mật khẩu cũ không được bỏ trống"),
});

export default changePasswordSchema;
