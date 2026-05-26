/**
 * Optional axios client pointed at the standalone Python tools service
 * (FastAPI + rembg, deployed to Hugging Face Docker Space).
 *
 * Activated only when `NEXT_PUBLIC_PYTHON_API_URL` is set. When unset,
 * `pythonApiClient` is `null` and callers should fall back to the Node
 * backend.
 */
import axios, { AxiosError, type AxiosInstance } from "axios";
import { ApiError } from "./client";

const PYTHON_BASE = process.env.NEXT_PUBLIC_PYTHON_API_URL?.replace(/\/+$/, "") ?? "";

export const isPythonApiEnabled = PYTHON_BASE.length > 0;

export const pythonApiClient: AxiosInstance | null = isPythonApiEnabled
  ? (() => {
      const instance = axios.create({
        baseURL: PYTHON_BASE,
        timeout: 120_000,
      });
      instance.interceptors.response.use(
        (res) => res,
        (error: AxiosError<{ detail?: string; message?: string }>) => {
          const status = error.response?.status ?? 0;
          const data = error.response?.data;
          const message =
            (data && (data.detail || data.message)) ||
            error.message ||
            "Python tools request failed";
          return Promise.reject(new ApiError(status, message, data));
        },
      );
      return instance;
    })()
  : null;
