import { Icon, IconNames } from "@/components/base/Icon";
import { ToastOptions, toast } from "react-toastify";

export type ToastType = "success" | "error" | "warning" | "info";
interface ToastArgs {
  message: string;
  type?: ToastType;
  options?: ToastOptions;
}

export const projectToasts = (args: ToastArgs) => {
  const { message, type = "info", options } = args;

  type ToastColors = "blue" | "green" | "yellow" | "red";

  const colors: Record<ToastType, ToastColors> = {
    info: "blue",
    success: "green",
    warning: "yellow",
    error: "red",
  };

  const borderColors = {
    info: "blue",
    success: "green",
    warning: "yellow",
    error: "red",
  };

  const icon: Record<ToastType, IconNames> = {
    info: "HiExclamation",
    success: "HiCheckCircle",
    warning: "HiExclamationCircle",
    error: "HiExclamationCircle",
  };

  toast(
    () => (
      <div style={{ color: colors[type] }} className="flex items-center gap-4">
        <Icon name={icon[type]} size={16} />
        <p>{message}</p>
      </div>
    ),
    {
      ...options,
      hideProgressBar: true,
      style: {
        padding: "12px 16px",
        background: "white",
        border: `1px solid ${borderColors[type]}`,
        boxShadow: "none",
        borderRadius: "8px",
        alignItems: "center",
      },
      bodyStyle: { padding: 0, margin: 0 },
    }
  );
};
