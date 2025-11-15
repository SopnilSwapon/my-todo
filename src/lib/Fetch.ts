export type TFetchError = {
  detail?: string;
  message?: string;
  statusCode?: number;
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

  if (!response.ok) {
    // assume backend returns {detail?, message?}
    const err: TFetchError = {
      ...(typeof data === "object" && data !== null ? data : {}),
      statusCode: response.status,
    } as TFetchError;

    throw err;
  }

  return data as T;
}
