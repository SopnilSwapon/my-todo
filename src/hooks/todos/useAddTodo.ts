import { useMutation } from "@tanstack/react-query";
import Fetch from "@/shared/lib/Fetch";

export interface IAddTodoPayload {
  title: string;
  date: string;
  priority: "extreme" | "moderate" | "low" | string;
  description: string;
}

export function useAddTodo() {
  return useMutation({
    mutationFn: async (payload: IAddTodoPayload) => {
      return Fetch({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/todos/`,
        body: payload,
      });
    },
  });
}
