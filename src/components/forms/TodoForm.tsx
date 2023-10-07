import { Button } from "@nextui-org/react";
import { Form, FormikProvider, useFormik } from "formik";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { FormikInput } from "../fields/FormikInput";

export interface TodoFormValues {
  name: string;
}

export interface TodoFormProps extends ComponentPropsWithoutRef<"form"> {
  initialValues?: Partial<TodoFormValues>;
  onFormSubmit: (values: TodoFormValues) => void;
  onCancelClick: () => void;
}

export const TodoForm: FC<TodoFormProps> = (props) => {
  const { initialValues, onFormSubmit, onCancelClick, className, ...rest } =
    props;

  const formik = useFormik<TodoFormValues>({
    initialValues: {
      name: initialValues?.name ?? "",
    },
    onSubmit: onFormSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={twMerge("space-y-2", className)}>
        <FormikInput name="name" placeholder="Name" />
        <div className="flex gap-3 flex-wrap justify-between items-center">
          <Button type="reset" onClick={onCancelClick}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </FormikProvider>
  );
};
