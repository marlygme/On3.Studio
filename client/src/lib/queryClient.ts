import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Build URL from hierarchical query key
    let url = queryKey[0] as string;
    
    // Handle parameterized routes (e.g., ['/api/availability', serviceId])
    if (queryKey.length === 2 && typeof queryKey[1] === 'string') {
      url = `${url}/${queryKey[1]}`;
    }
    // Handle query parameters (e.g., ['/api/bookings', { startDate, endDate, serviceId }])
    else if (queryKey.length === 2 && typeof queryKey[1] === 'object' && queryKey[1] !== null) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(queryKey[1] as Record<string, any>)) {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      }
      if (params.toString()) {
        url = `${url}?${params.toString()}`;
      }
    }

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
