import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import { computed, watch } from "vue";
import { postService } from "@/api/services/post";

export const useComment = (postId: Ref<number>) => {
  const currentPostId = computed(() => postId.value);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["comments", currentPostId.value],
    queryFn: () => postService.getPostComments(currentPostId.value),
    enabled: !!currentPostId.value,
  });

  watch(postId, () => {
    if (postId.value) {
      refetch();
    }
  });

  return {
    data,
    isLoading,
    error,
    refresh: refetch,
  };
};
