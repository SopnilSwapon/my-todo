import { TokenService } from "./token";

export async function refreshAccessToken() {
  const refresh = TokenService.getRefresh();
  if (!refresh) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/`,
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
