import { useField } from "formik";
import { type FC } from "react";
import { PasswordInput, PasswordInputProps } from "../ui/PasswordInput";

export interface FormikPasswordInputProps extends PasswordInputProps {
  name: string;
}

export const FormikPasswordInput: FC<FormikPasswordInputProps> = (props) => {
  const { name, ...rest } = props;

  const [field, meta] = useField(name);

  const error = meta.touched && meta.error;

  return (
    <PasswordInput
      {...rest}
      {...field}
      isInvalid={!!error}
      errorMessage={error}
    />
  );
};
