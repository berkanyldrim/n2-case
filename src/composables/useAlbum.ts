import { useQuery } from "@tanstack/vue-query";
import { albumService } from "@/api/services/album";

export const useAlbum = (userId: number) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["albums", userId],
    queryFn: () => albumService.getUserAlbums(userId),
    enabled: !!userId,
  });

  return {
    data,
    isLoading,
    error,
    refresh: refetch,
  };
};
