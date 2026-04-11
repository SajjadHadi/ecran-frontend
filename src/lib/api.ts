const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

class ApiError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  console.log("API Request:", { url, method: fetchOptions.method || "GET" });

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    credentials: "include",
  });

  console.log("API Response Status:", response.status);

  const data = await response.json();

  console.log("API Response Data:", data);

  if (!response.ok || !data.success) {
    throw new ApiError(
      data.error?.code || "UNKNOWN_ERROR",
      data.error?.message || "An unknown error occurred"
    );
  }

  return data;
}

export const api = {
  get: <T>(endpoint: string, params?: Record<string, string | number | undefined>) =>
    fetchApi<T>(endpoint, { method: "GET", params }),

  post: <T>(endpoint: string, body?: unknown) =>
    fetchApi<T>(endpoint, { method: "POST", body: JSON.stringify(body) }),

  patch: <T>(endpoint: string, body?: unknown) =>
    fetchApi<T>(endpoint, { method: "PATCH", body: JSON.stringify(body) }),

  delete: <T>(endpoint: string) =>
    fetchApi<T>(endpoint, { method: "DELETE" }),
};

export { ApiError };
export type { ApiResponse, PaginatedResponse } from "@/types";