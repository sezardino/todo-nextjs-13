import { RegistrationBody } from "@/app/api/registration/schema";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useRegistrationMutation = () =>
  useMutation({
    mutationFn: (data: RegistrationBody) => api.auth.registration(data),
  });
