import { ReactNode, type FC } from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";

export interface DialogProps extends Omit<ModalProps, "children"> {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
}

export const Dialog: FC<DialogProps> = (props) => {
  const { body, header, footer, title, className, ...rest } = props;

  return (
    <Modal {...rest} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            {header && (
              <ModalHeader className="flex flex-col gap-1">
                {header}
              </ModalHeader>
            )}
            {body && <ModalBody>{body}</ModalBody>}
            {footer && <ModalFooter className="block">{footer}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
