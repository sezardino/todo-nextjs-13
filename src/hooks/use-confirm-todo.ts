import { useCallback, useMemo, useState } from "react";

type UseConfirmTodoArgs = {
  onDelete: (id: string) => Promise<void>;
  onComplete: (id: string) => Promise<void>;
  onHide: (id: string) => Promise<void>;
};

type ModalData = {
  type: "delete" | "hide" | "complete";
  id: string;
};

export const useConfirmTodo = (args: UseConfirmTodoArgs) => {
  const { onComplete, onDelete, onHide } = args;

  const [modalData, setModalData] = useState<ModalData | null>(null);

  const closeConfirmDialog = () => setModalData(null);

  const deleteHandler = useCallback(async () => {
    if (!modalData) return;
    if (modalData.type !== "delete") return;
    if (!modalData.id) return;

    try {
      await onDelete(modalData.id);
      setModalData(null);
    } catch (error) {}
  }, [modalData, onDelete]);

  const copy = useMemo(() => {
    const blank = {
      title: "",
      description: "",
      handler: () => undefined,
      trigger: "",
      cancel: "",
    };

    if (!modalData) return blank;

    if (modalData.type === "delete")
      return {
        title: "Confirm",
        description: "Are you sure you want to delete this todo?",
        handler: deleteHandler,
        trigger: "Delete",
        cancel: "Cancel",
      };
    if (modalData.type === "hide")
      return {
        title: "Confirm",
        description: "Are you sure you want to hide this todo?",
        handler: () => undefined,
        trigger: "Hide",
        cancel: "Cancel",
      };

    if (modalData.type === "complete")
      return {
        title: "Confirm",
        description: "Are you sure you want to complete this todo?",
        handler: () => undefined,
        trigger: "Complete",
        cancel: "Cancel",
      };

    return blank;
  }, [modalData, deleteHandler]);

  return {
    modalData,
    onTodoRequest: setModalData,
    onCancelTodoRequest: closeConfirmDialog,
    copy,
  };
};
