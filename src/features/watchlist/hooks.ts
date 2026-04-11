import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { WatchlistItem, ApiResponse } from "@/types";

export function useWatchlist() {
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<WatchlistItem[]>>("/watchlist");
      return response.data;
    },
  });
}

export function useAddToWatchlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      showId,
      showData,
      status,
    }: {
      showId: string;
      showData: unknown;
      status?: "want_to_watch" | "watching" | "watched";
    }) => {
      const response = await api.post<ApiResponse<WatchlistItem>>("/watchlist", { showId, showData, status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
}

export function useUpdateWatchlistItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      showId,
      data,
    }: {
      showId: string;
      data: { status: "want_to_watch" | "watching" | "watched" };
    }) => {
      const response = await api.patch<ApiResponse<WatchlistItem>>(`/watchlist/${showId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
}

export function useRemoveFromWatchlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (showId: string) => api.delete(`/watchlist/${showId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
}
