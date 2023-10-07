import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

type SubComponents = {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

type DrawerProps = Omit<
  ModalProps,
  "className" | "fullScreen" | "closeButton" | "animated" | "backdrop"
>;

export const Drawer: FC<DrawerProps> & SubComponents = (props) => {
  const { isOpen, children, ...rest } = props;

  return (
    <Modal
      {...rest}
      className={twMerge(
        "fixed top-0 right-0 h-full w-full max-w-2xl border-r-0 translate-x-full",
        isOpen && "animate-slide-in"
      )}
      closeButton
      animated={false}
      backdrop="blur"
      {...props}
    >
      <ModalContent className="m-[0_!important] rounded-r-none">
        {children}
      </ModalContent>
    </Modal>
  );
};

Drawer.Header = ModalHeader;
Drawer.Body = ModalBody;
Drawer.Footer = ModalFooter;
