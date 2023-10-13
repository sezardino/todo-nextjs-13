import { Button } from "@nextui-org/react";
import { PropsWithChildren, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { Dialog, DialogProps } from "./Dialog";

export type ConfirmDialogProps = PropsWithChildren &
  Omit<DialogProps, "header" | "body" | "footer" | "children"> & {
    title: string;
    description?: string;
    cancelButton: { label: string; onClick?: () => void };
    confirmButton: { label: string; onClick?: () => void };
  };

export const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
  const {
    title,
    description,
    cancelButton,
    confirmButton,
    className,
    children,
    ...rest
  } = props;

  return (
    <Dialog {...rest} className={twMerge(className)}>
      <Dialog.Header className="flex flex-col">
        <h2 className="text-center text-lg font-semibold leading-7 text-gray-900">
          {title}
        </h2>
        {description && (
          <p className="text-center mt-1 text-sm leading-6 text-gray-600">
            {description}
          </p>
        )}
      </Dialog.Header>
      {!!children && <Dialog.Body>{children}</Dialog.Body>}
      <Dialog.Footer className="flex items-center justify-between gap-2 flex-wrap">
        {" "}
        <Button onClick={cancelButton.onClick}>{cancelButton.label}</Button>
        <Button onClick={confirmButton.onClick}>{confirmButton.label}</Button>
      </Dialog.Footer>
    </Dialog>
  );
};
