import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes, ClassAttributes } from "react";

const defaultInputStyle =
  "form-control block w-full px-2 py-4  text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

type defaultInputType = ClassAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends defaultInputType {
  additionalClassName?: string;
  errorMessage?: string;
}

const Input = (props: InputProps) => {
  const { errorMessage, additionalClassName } = props;
  return (
    <>
      <input
        className={twMerge(defaultInputStyle, additionalClassName)}
        {...props}
      />
      {errorMessage && (
        <p className="text-right text-sm mt-2  text-red-600 ">{errorMessage}</p>
      )}
    </>
  );
};

export default Input;
