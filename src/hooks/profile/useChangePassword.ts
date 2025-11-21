import { useMutation } from "@tanstack/react-query";
import Fetch from "@/shared/lib/Fetch";

export interface IChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (payload: IChangePasswordPayload) => {
      return Fetch({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/change-password/`,
        body: payload,
      });
    },
  });
}
