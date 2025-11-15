import { TokenService } from "@/lib/auth/token";

export type TFetchError = {
  detail?: string;
  message?: string;
  statusCode?: number;
  [key: string]: any;
};

interface IFetchProps {
  method: string;
  url: string;
  body?: unknown;
  multipart?: boolean;
  abortController?: AbortController;
  headers?: Record<string, string>;
}

export default async function Fetch<T>({
  method,
  url,
  body,
  multipart,
  abortController,
  headers: customHeaders = {},
}: IFetchProps): Promise<T> {
  const headers: HeadersInit = {
    ...customHeaders,
  };

  const access = TokenService.getAccess();

  const isAuthURL =
    url.includes("/auth/login") || url.includes("/users/signup");

  if (access && !isAuthURL) {
    headers["Authorization"] = `Bearer ${access}`;
  }

  // Normal JSON requests
  if (!multipart) {
    headers["Content-Type"] = "application/json";
  }

  const options: RequestInit = {
    method,
    headers,
    signal: abortController?.signal,
    body: multipart
      ? (body as BodyInit)
      : body
      ? JSON.stringify(body)
      : undefined,
  };

  const response = await fetch(url, options);

  const text = await response.text();
  let data: unknown;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  // ERROR HANDLING
  if (!response.ok) {
    const err: TFetchError = {
      ...(typeof data === "object" && data !== null ? data : {}),
      statusCode: response.status,
    };
    throw err;
  }

  return data as T;
}
