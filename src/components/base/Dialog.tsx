import { type FC } from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";

export interface DialogProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: JSX.Element;
  body?: JSX.Element;
  footer?: JSX.Element;
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
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
