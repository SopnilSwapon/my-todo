"use client";

import { TokenService } from "./auth/token";
import { refreshAccessToken } from "./auth/refresh";
import { globalLogout } from "./auth/logout";

export type TFetchError = {
  detail?: string;
  message?: string;
  statusCode?: number;
  [key: string]: unknown;
};

interface IFetchProps {
  method: string;
  url: string;
  body?: unknown;
  multipart?: boolean;
  abortController?: AbortController;
  headers?: Record<string, string>;
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Fetch<T>({
  method,
  url,
  body,
  multipart,
  abortController,
  headers: custom = {},
}: IFetchProps): Promise<T> {
  const access = TokenService.getAccess();

  // Routes that should not force logout
  const isAuthURL =
    url.includes("/auth/login") ||
    url.includes("/auth/refresh") ||
    url.includes("/users/signup");

  const headers: HeadersInit = { ...custom };

  // 🔥 1. No token on protected routes → logout & redirect
  if (!access && !isAuthURL) {
    globalLogout(); // safe logout
    return Promise.reject({
      detail: "Unauthorized",
      statusCode: 401,
    });
  }

  // Include access token for protected routes
  if (access && !isAuthURL) {
    headers["Authorization"] = `Bearer ${access}`;
  }

  // Default JSON headers
  if (!multipart) {
    headers["Content-Type"] = "application/json";
  }

  // Request config
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

  // First request
  let response = await fetch(url, options);

  // 🔥 2. Token expired → refresh token
  if (response.status === 401 && !isAuthURL) {
    const newAccess = await refreshAccessToken();

    if (!newAccess) {
      TokenService.clear();
      globalLogout(); // safe logout
      return Promise.reject({
        detail: "Session expired",
        statusCode: 401,
      });
    }

    // Retry original request with new token
    headers["Authorization"] = `Bearer ${newAccess}`;
    options.headers = headers;
    response = await fetch(url, options);
  }

  // Parse response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  //  3. Generic API errors
  if (!response.ok) {
    const err = {
      ...data,
      statusCode: response.status,
    };

    // Auto logout ONLY on protected routes
    if (err.statusCode === 401 && !isAuthURL) {
      TokenService.clear();
      globalLogout();
    }

    return Promise.reject(err);
  }

  return data as T;
}
