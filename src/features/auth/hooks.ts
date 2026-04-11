import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Session, User, ApiResponse } from "@/types";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Session>>("/auth/session");
      return response.data;
    },
    retry: false,
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await api.post<ApiResponse<User>>("/auth/sign-in/credentials", { email: credentials.email, password: credentials.password, callbackURL: "/", redirect: false });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string; name?: string }) => {
      const response = await api.post<ApiResponse<User>>("/auth/sign-up", { email: credentials.email, password: credentials.password, name: credentials.name });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/sign-out", {});
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
