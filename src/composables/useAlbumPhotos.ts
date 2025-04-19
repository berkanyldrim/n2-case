import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import { computed } from "vue";
import { albumService } from "@/api/services/album";

interface Album {
  id: number;
  title: string;
  userId: number;
}

export const useAlbumPhotos = (albumId: Ref<number>) => {
  const albumQuery = useQuery({
    queryKey: ["albums"],
    queryFn: () => albumService.getAlbums(),
  });

  const photosQuery = useQuery({
    queryKey: ["photos", albumId],
    queryFn: async () => {
      const photos = await albumService.getAlbumPhotos(albumId.value);

      return photos.map((photo: any, index: number) => ({
        ...photo,
        url: `https://picsum.photos/600/400?random=${
          albumId.value * 50 + index
        }`,
        thumbnailUrl: `https://picsum.photos/150/150?random=${
          albumId.value * 50 + index
        }`,
      }));
    },
    enabled: !!albumId.value,
  });

  const album = computed(() => {
    if (!albumQuery.data.value || !albumId.value) return null;
    return (
      albumQuery.data.value.find((a: Album) => a.id === albumId.value) || null
    );
  });

  return {
    data: photosQuery.data,
    album,
    isLoading: computed(
      () => albumQuery.isLoading.value || photosQuery.isLoading.value
    ),
    error: computed(() => albumQuery.error.value || photosQuery.error.value),
    refresh: photosQuery.refetch,
  };
};
