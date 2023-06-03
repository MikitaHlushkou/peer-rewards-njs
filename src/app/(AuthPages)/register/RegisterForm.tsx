"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerSchema } from "@/app/(AuthPages)/register/ValidationSchema";
import Input from "@/components/Input/Input";
import { registerUserQuery } from "@/services/auth";
import { AUTH_CREDS_PROVIDERS } from "@/enum";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const { mutate: registerUser } = useMutation({
    mutationFn: registerUserQuery,
    onSuccess: async (data, variables) => {
      const { user } = data;

      await signIn(AUTH_CREDS_PROVIDERS.credentials, {
        ...user,
        password: variables.password,
        callbackUrl,
      });
    },
    onError: (e) => setError(e.message),
  });

  const {
    getFieldProps,
    handleSubmit,
    handleReset,
    errors,
    isValid,
  } = useFormik({
    initialValues: { fullName: "", password: "", email: "" },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        await registerUser(values);
        setLoading(false);
        handleReset();
      } catch (e: any) {
        setLoading(false);
        setError(e);
      }
    },
  });

  const inputs = [
    {
      id: "fullName",
      type: "name",
      placeholder: "Name",
      fieldName: "fullName",
      required: true,
    },
    {
      id: "email",
      type: "email",
      placeholder: "Email address",
      fieldName: "email",
      required: true,
    },
    {
      id: "password",
      type: "password",
      placeholder: "Password",
      fieldName: "password",
      required: true,
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      {inputs.map(({ id, fieldName, placeholder, type, required }) => (
        <div className="mb-6" key={id}>
          <Input
            required={required}
            type={type}
            {...getFieldProps(fieldName)}
            placeholder={placeholder}
            errorMessage={errors[fieldName]}
          />
        </div>
      ))}
      <button
        type="submit"
        className="inline-block bg-blue-600 disabled:bg-gray-500 px-1 text-center py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full "
        disabled={!isValid || loading}
      >
        {loading ? "loading..." : "Sign up"}
      </button>
    </form>
  );
};

export default RegisterForm;
