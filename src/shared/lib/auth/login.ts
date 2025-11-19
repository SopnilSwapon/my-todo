import Fetch from "@/shared/lib/Fetch";

interface ILoginData {
  email: string;
  password: string;
}

export type TLoginResponse = {
  access: string;
  refresh: string;
};

export function login(data: ILoginData) {
  return Fetch<TLoginResponse>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`,
    body: data,
  });
}
