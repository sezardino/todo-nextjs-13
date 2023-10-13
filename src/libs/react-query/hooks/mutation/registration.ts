import { RegistrationBody } from "@/app/api/auth/registration/schema";
import { projectToasts } from "@/libs/react-toastify";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useRegistrationMutation = () =>
  useMutation({
    mutationFn: (data: RegistrationBody) => api.auth.registration(data),
    onSuccess: () => {
      projectToasts({ type: "success", message: "Registration successful!" });
    },
    onError: () => {
      projectToasts({ type: "error", message: "Error registering!" });
    },
  });
