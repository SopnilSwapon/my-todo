import Fetch from "@/lib/Fetch";

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
    url: "https://todo-app.pioneeralpha.com/api/auth/login/",
    body: data,
  });
}
