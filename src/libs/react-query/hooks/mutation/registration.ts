import { ProjectApiUrls } from "@/const/url";
import { RegistrationDto } from "@/services/db/modules/auth/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const handler = async (data: RegistrationDto) => {
  return await axios({
    url: ProjectApiUrls.registration,
    method: "POST",
    data,
  }).then((res) => res.data);
};

export const useRegistrationMutation = () =>
  useMutation({
    mutationFn: handler,
  });
