import { refreshAccessToken } from "./auth/refresh";
import { TokenService } from "./auth/token";

export interface IFetchProps {
  method: string;
  url: string;
  body?: unknown;
  multipart?: boolean;
  abortController?: AbortController;
  headers?: Record<string, string>;
}

export interface IFetchResult<T> {
  data: T;
  message: string;
  code: string;
}

async function Fetch<T>({
  method,
  url,
  body,
  multipart,
  abortController,
  headers: customHeaders = {},
}: IFetchProps): Promise<IFetchResult<T>> {
  const access = TokenService.getAccess();

  const headers: HeadersInit = {
    ...customHeaders,
  };

  if (access) {
    headers["Authorization"] = `Bearer ${access}`;
  }

  if (!multipart) {
    headers["Content-Type"] = "application/json";
  }

  async function request() {
    const response = await fetch(url, {
      method,
      headers,
      signal: abortController?.signal,
      body: multipart ? (body as BodyInit) : JSON.stringify(body),
    });

    let data;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    return { response, data };
  }

  // 1️⃣ First try with existing access token
  let { response, data } = await request();

  // 2️⃣ If access token is expired → refresh it
  if (response.status === 401) {
    const newAccess = await refreshAccessToken();

    if (!newAccess) {
      TokenService.clear();
      throw { message: "Session expired", statusCode: 401 };
    }

    // Retry original request with new access token
    headers["Authorization"] = `Bearer ${newAccess}`;

    ({ response, data } = await request());
  }

  // 3️⃣ Handle errors
  if (!response.ok) {
    throw { ...data, statusCode: response.status };
  }

  return data;
}

export default Fetch;
