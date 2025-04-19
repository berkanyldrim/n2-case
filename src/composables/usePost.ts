import { useQuery } from "@tanstack/vue-query";
import { postService } from "@/api/services/post";

export const usePost = (userId: number) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => postService.getUserPosts(userId),
    enabled: !!userId,
  });

  return {
    data,
    isLoading,
    error,
    refresh: refetch,
  };
};
