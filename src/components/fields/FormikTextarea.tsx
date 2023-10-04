import { useField } from "formik";
import { type FC } from "react";
import { BaseTextarea, BaseTextareaProps } from "../base/Textarea";

export interface FormikTextareaProps extends BaseTextareaProps {
  name: string;
}

export const FormikTextarea: FC<FormikTextareaProps> = (props) => {
  const { name, ...rest } = props;

  const [field, meta] = useField(name);

  const error = meta.touched && meta.error;

  return (
    <BaseTextarea
      {...rest}
      {...field}
      isInvalid={!!error}
      errorMessage={error}
    />
  );
};
