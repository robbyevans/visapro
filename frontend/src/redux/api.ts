import axios, { type AxiosInstance } from "axios";

/**
 * In Vite, env variables meant for the client must be prefixed with VITE_
 * and are exposed via `import.meta.env`.
 *
 * Vite already provides the `ImportMetaEnv` types via `vite/client` (you have that in tsconfig).
 */
const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) ?? "";

/**
 * Create a configured axios instance.
 * - If token is provided it will be attached as Authorization: Bearer <token>
 * - If token is not provided but localStorage has 'token', it will use that.
 */
export function axiosInstance(token?: string | null): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const resolvedToken =
    token ??
    (typeof localStorage !== "undefined"
      ? localStorage.getItem("token")
      : null);

  if (resolvedToken) {
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${resolvedToken}`;
  } else {
    // ensure header absent

    delete (instance.defaults.headers.common as Record<string, unknown>)[
      "Authorization"
    ];
  }

  return instance;
}

export default axiosInstance;
