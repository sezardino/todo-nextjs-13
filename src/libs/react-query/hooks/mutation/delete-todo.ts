import { ProjectApiUrls } from "@/const/url";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const handler = async (id: string) => {
  return axios({
    url: ProjectApiUrls.deleteTodo(id),
    method: "DELETE",
  });
};

export const useCreateTodoMutation = () => {
  return useMutation({
    mutationFn: handler,
  });
};
