import { object, string } from "yup";

export const registerSchema = object({
  email: string().nullable().optional().email("Please enter valid email"),
  password: string().min(8, "Please create password with min of 8 characters"),
});
