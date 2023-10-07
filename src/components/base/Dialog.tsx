import { type FC } from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";

export interface DialogProps extends Omit<ModalProps, "backdrop"> {
  isOpen: boolean;
  onClose: () => void;
}

type SubComponents = {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

export const Dialog: FC<DialogProps> & SubComponents = (props) => {
  const { title, className, children, ...rest } = props;

  return (
    <Modal {...rest} backdrop="blur">
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

Dialog.Header = ModalHeader;
Dialog.Body = ModalBody;
Dialog.Footer = ModalFooter;
