"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Input from "@/components/Input/Input";
import { loginSchema } from "@/app/(AuthPages)/login/ValidationShema";
import { AUTH_CREDS_PROVIDERS } from "@/enum";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    getFieldProps,
    handleSubmit,
    handleReset,
    errors,
    isValid,
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const res = await signIn(AUTH_CREDS_PROVIDERS.credentials, {
          redirect: false,
          ...values,
          callbackUrl,
        });

        setLoading(false);

        handleReset();
        if (!res?.error) {
          router.push(callbackUrl);
        } else {
          setError("invalid email or password");
        }
      } catch (error: any) {
        setLoading(false);
        setError(error);
      }
    },
  });

  const inputs = [
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
        <div className={"mb-6"} key={id}>
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
        {loading ? "loading..." : "Sign In"}
      </button>

      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>

      <a
        className="px-7 py-2 text-white bg-blue-600 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
        onClick={() => signIn(AUTH_CREDS_PROVIDERS.google, { callbackUrl })}
        role="button"
      >
        <img className="pr-2 h-8" src="/images/google.svg" alt="" />
        Continue with Google
      </a>
    </form>
  );
};

export default LoginForm;
