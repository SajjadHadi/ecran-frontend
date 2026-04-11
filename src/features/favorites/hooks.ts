import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { FavoriteList, FavoriteItem, ApiResponse } from "@/types";

export function useFavoriteLists() {
  return useQuery({
    queryKey: ["favorites", "lists"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<FavoriteList[]>>("/favorites/lists");
      return response.data;
    },
  });
}

export function useFavoriteListItems(listId: string) {
  return useQuery({
    queryKey: ["favorites", "lists", listId, "items"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<FavoriteItem[]>>(`/favorites/lists/${listId}/items`);
      return response.data;
    },
    enabled: !!listId,
  });
}

export function useCreateFavoriteList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; description?: string }) => {
      const response = await api.post<ApiResponse<FavoriteList>>("/favorites/lists", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", "lists"] });
    },
  });
}

export function useUpdateFavoriteList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      listId,
      data,
    }: {
      listId: string;
      data: { name?: string; description?: string };
    }) => api.patch<ApiResponse<FavoriteList>>(`/favorites/lists/${listId}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["favorites", "lists"] });
      queryClient.invalidateQueries({
        queryKey: ["favorites", "lists", variables.listId],
      });
    },
  });
}

export function useDeleteFavoriteList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (listId: string) =>
      api.delete(`/favorites/lists/${listId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", "lists"] });
    },
  });
}

export function useAddFavoriteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      listId,
      showId,
      showData,
    }: {
      listId: string;
      showId: string;
      showData: unknown;
    }) => api.post<ApiResponse<FavoriteItem>>(`/favorites/lists/${listId}/items`, { showId, showData }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", "lists", variables.listId, "items"],
      });
    },
  });
}

export function useUpdateFavoriteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      listId,
      itemId,
      data,
    }: {
      listId: string;
      itemId: string;
      data: { rank?: number; comment?: string };
    }) =>
      api.patch<ApiResponse<FavoriteItem>>(
        `/favorites/lists/${listId}/items/${itemId}`,
        data
      ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", "lists", variables.listId, "items"],
      });
    },
  });
}

export function useDeleteFavoriteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ listId, itemId }: { listId: string; itemId: string }) =>
      api.delete(`/favorites/lists/${listId}/items/${itemId}`),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", "lists", variables.listId, "items"],
      });
    },
  });
}
