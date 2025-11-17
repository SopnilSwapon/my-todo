import Fetch from "@/shared/lib/Fetch";

interface ISignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface ISignUpResponse {
  message: string;
}

export function signup(data: ISignUpData) {
  return Fetch<ISignUpResponse>({
    method: "POST",
    url: "https://todo-app.pioneeralpha.com/api/users/signup/",
    body: data,
  });
}
