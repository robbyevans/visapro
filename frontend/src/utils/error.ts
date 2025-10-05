import axios from "axios";

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | { error?: string; errors?: string[] }
      | undefined;
    if (data?.errors)
      return Array.isArray(data.errors)
        ? data.errors.join(", ")
        : String(data.errors);
    if (data?.error) return data.error;
    return err.message || "Request error";
  }
  if (err instanceof Error) return err.message;
  return String(err);
}
