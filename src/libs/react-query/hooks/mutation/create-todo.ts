import { CreateTodoBody } from "@/app/api/todo/schema";
import { ProjectApiUrls } from "@/const/url";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const handler = async (data: CreateTodoBody) => {
  return axios({
    url: ProjectApiUrls.createTodo,
    method: "POST",
    data: JSON.stringify(data),
  }).then((res) => res.data);
};

export const useCreateTodoMutation = () => {
  return useMutation({
    mutationFn: handler,
  });
};
