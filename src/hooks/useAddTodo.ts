"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Fetch, { TFetchError } from "@/shared/lib/Fetch";
import { UseFormSetError } from "react-hook-form";

export interface IAddTodoPayload {
  title: string;
  date: string;
  priority: "extreme" | "moderate" | "low" | string;
  description: string;
}

export function useAddTodo(setError: UseFormSetError<IAddTodoPayload>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IAddTodoPayload) => {
      return Fetch({
        method: "POST",
        url: "https://todo-app.pioneeralpha.com/api/todos/",
        body: payload,
      });
    },

    onSuccess: (data) => {
      console.log(data, "check data");
      // Re-fetch todo list
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },

    onError: (error: TFetchError) => {
      Object.keys(error).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (Array.isArray((error as any)[key])) {
          setError(key as keyof IAddTodoPayload, {
            type: "server",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            message: (error as any)[key][0],
          });
        }
      });
    },
  });
}
