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
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup/`,
    body: data,
  });
}
