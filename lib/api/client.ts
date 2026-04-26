import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";
import { createClient } from "@/lib/supabase/client";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "http://localhost:5000/api";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function getToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 60_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    const status = error.response?.status ?? 0;
    const data = error.response?.data;
    const message =
      (data && (data.message || data.error)) ||
      error.message ||
      "Request failed";
    return Promise.reject(new ApiError(status, message, data));
  },
);

type Init = Omit<AxiosRequestConfig, "method" | "url" | "data" | "baseURL">;

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const res = await apiClient.request<T>(config);
  return res.data;
}

export const api = {
  get: <T>(path: string, init?: Init) => request<T>({ ...init, method: "GET", url: path }),
  post: <T>(path: string, body?: unknown, init?: Init) =>
    request<T>({ ...init, method: "POST", url: path, data: body }),
  put: <T>(path: string, body?: unknown, init?: Init) =>
    request<T>({ ...init, method: "PUT", url: path, data: body }),
  patch: <T>(path: string, body?: unknown, init?: Init) =>
    request<T>({ ...init, method: "PATCH", url: path, data: body }),
  del: <T>(path: string, init?: Init) =>
    request<T>({ ...init, method: "DELETE", url: path }),
  postForm: <T>(path: string, form: FormData, init?: Init) =>
    request<T>({
      ...init,
      method: "POST",
      url: path,
      data: form,
      headers: { ...(init?.headers ?? {}), "Content-Type": "multipart/form-data" },
    }),
};
