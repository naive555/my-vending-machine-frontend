import axios, { AxiosError } from "axios";

export function handleError(error: unknown, context: string): never {
  const message =
    error instanceof AxiosError
      ? error.response?.data?.detail ?? error.message
      : "An unexpected error occurred";
  throw new Error(`${context}: ${message}`);
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
