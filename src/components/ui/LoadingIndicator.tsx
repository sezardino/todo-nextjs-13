import { type FC } from "react";

import { Modal, ModalContent, Spinner } from "@nextui-org/react";

export const LoadingIndicator: FC = () => {
  return (
    <Modal isOpen backdrop="blur" disableAnimation hideCloseButton>
      <ModalContent className="bg-transparent shadow-none">
        <Spinner color="default" labelColor="foreground" />
      </ModalContent>
    </Modal>
  );
};
