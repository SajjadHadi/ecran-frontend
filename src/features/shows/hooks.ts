import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Show, PaginatedResponse, ApiResponse } from "@/types";

export function useShows(search?: string, genre?: string, page = 1) {
  return useQuery({
    queryKey: ["shows", search, genre, page],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Show>>("/shows", {
        q: search,
        genre,
        page,
        limit: 20,
      });
      return response;
    },
  });
}

export function useTrendingShows(page = 1) {
  return useQuery({
    queryKey: ["shows", "trending", page],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Show>>("/shows/trending", { page, limit: 20 });
      return response;
    },
  });
}

export function useFeaturedShows(limit = 10) {
  return useQuery({
    queryKey: ["shows", "featured", limit],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Show[]>>("/shows/featured", { limit });
      return response.data;
    },
  });
}

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<string[]>>("/shows/genres");
      return response;
    },
  });
}

export function useShow(id: number) {
  return useQuery({
    queryKey: ["show", id],
    queryFn: () => api.get<ApiResponse<Show>>(`/shows/${id}`).then(r => r.data),
    enabled: !!id,
  });
}

export function useShowEpisodes(id: number) {
  return useQuery({
    queryKey: ["show", id, "episodes"],
    queryFn: () => api.get<ApiResponse<Show>>(`/shows/${id}/episodes`).then(r => r.data),
    enabled: !!id,
  });
}
