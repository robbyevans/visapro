import axios, { type AxiosInstance } from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://your-rails-app.fly.dev";

/**
 * Create a configured axios instance.
 * - token param overrides stored token
 * - if useCredentials is true, axios will send cookies (for session auth)
 */
export function axiosInstance(
  token?: string | null,
  useCredentials = false
): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: useCredentials,
  });

  const resolvedToken: string | null =
    token ??
    (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  if (resolvedToken) {
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${resolvedToken}`;
  }

  return instance;
}

export default axiosInstance;
