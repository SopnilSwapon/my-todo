import { useQuery } from "@tanstack/react-query";
import Fetch from "@/shared/lib/Fetch";

interface IParams {
  search?: string;
}
export type TTodo = {
  id: number;
  title: string;
  description: string;
  todo_date: string;
  priority: string;
  is_completed: boolean;
  updated_at: string;
};

export interface ITodoResponse {
  count: number;
  next: string | null;
  results: TTodo[];
}

export const QK_ALL_TODOS = "all_todos";

function buildQueryString(params: IParams) {
  const qs = new URLSearchParams();

  if (params.search) qs.append("search", params.search);

  return qs.toString();
}

export default function useGetAllTodos(params: IParams) {
  const queryString = buildQueryString(params);

  return useQuery({
    queryKey: [QK_ALL_TODOS, params],
    queryFn: async () =>
      await Fetch<ITodoResponse>({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/todos/?${queryString}`,
      }),
  });
}
