import { TokenService } from "./token";

export async function refreshAccessToken() {
  const refresh = TokenService.getRefresh();
  if (!refresh) return null;

  const res = await fetch(
    "https://todo-app.pioneeralpha.com/api/auth/refresh/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  TokenService.setAccess(data.access);
  return data.access;
}
