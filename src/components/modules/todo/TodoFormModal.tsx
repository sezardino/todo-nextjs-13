import { Dialog, DialogProps } from "@/components/base/Dialog";
import { TodoForm, TodoFormProps } from "@/components/forms/TodoForm";
import { type FC } from "react";

export type TodoFormModalProps = Omit<DialogProps, "children"> & {
  title: string;
  onFormSubmit: TodoFormProps["onFormSubmit"];
  initialValues?: TodoFormProps["initialValues"];
};

export const TodoFormModal: FC<TodoFormModalProps> = (props) => {
  const { onFormSubmit, initialValues, className, ...rest } = props;

  return (
    <Dialog {...rest}>
      <Dialog.Body>
        <TodoForm
          initialValues={initialValues}
          onFormSubmit={onFormSubmit}
          onCancelClick={rest.onClose}
        />
      </Dialog.Body>
    </Dialog>
  );
};
