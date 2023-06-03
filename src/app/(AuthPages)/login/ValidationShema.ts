import { object, string } from "yup";

export const loginSchema = object({
  email: string()
    .nullable()
    .optional()
    .email("Please enter valid email")
    .required("Email is a required field"),
  password: string().required("Password is a required field"),
});
