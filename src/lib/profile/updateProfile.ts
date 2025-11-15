import Fetch from "@/lib/Fetch";

export interface IUpdateProfilePayload {
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_number: string;
  birthday: string;
  bio: string;
  profile_image: File | null;
}

export async function updateProfile(data: IUpdateProfilePayload) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return Fetch({
    method: "PATCH",
    url: "https://todo-app.pioneeralpha.com/api/users/me/",
    body: formData,
    multipart: true, // <-- IMPORTANT
  });
}
