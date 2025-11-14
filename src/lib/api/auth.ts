export async function signup(data: any) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json();
}

export async function login(data: any) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json();
}
