import { useQuery } from "@tanstack/react-query";
import Fetch from "@/shared/lib/Fetch";

export interface IUserInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  bio: string;
  birthday: string | null;
  contact_number: string;
  profile_image: string | null;
}

export const QK_USER_PROFILE_INFO = "user_profile_information";

export default function useGetProfileInfo() {
  return useQuery({
    queryKey: [QK_USER_PROFILE_INFO],
    queryFn: async () =>
      await Fetch<IUserInfo>({
        method: "GET",
        url: `https://todo-app.pioneeralpha.com/api/users/me/`,
      }),
  });
}
