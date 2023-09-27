import { useField } from "formik";
import { type FC } from "react";
import { BaseInput, BaseInputProps } from "../base/Input";

export interface FormikInputProps extends BaseInputProps {
  name: string;
}

export const FormikInput: FC<FormikInputProps> = (props) => {
  const { name, ...rest } = props;

  const [field, meta] = useField(name);

  const error = meta.touched && meta.error;

  return (
    <BaseInput {...rest} {...field} isInvalid={!!error} errorMessage={error} />
  );
};
