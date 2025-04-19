<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { usePost } from "@/composables/usePost";
import { useComment } from "@/composables/useComment";
import { ref, computed, watch } from "vue";
import type { Post, Comment } from "@/types/post";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  IconSquareRoundedArrowRight,
  IconSquareRoundedArrowLeft,
} from "@tabler/icons-vue";

const route = useRoute();
const router = useRouter();
const userId = Number(route.params.userId);

const { data: posts, isLoading: isLoadingPosts } = usePost(userId);

// Seçilen post ve dialog durumu
const selectedPost = ref<Post | null>(null);
const isDialogOpen = ref(false);
const selectedPostId = ref<number | null>(null);

const showPostDetails = (post: Post) => {
  selectedPost.value = post;
  selectedPostId.value = post.id;
  isDialogOpen.value = true;
};

const activePostId = computed<number>(() => selectedPostId.value || 0);

const {
  data: comments,
  isLoading: isLoadingComments,
  refresh: refreshComments,
} = useComment(activePostId);

// Dialog kapandığında seçilen post'u temizle
watch(isDialogOpen, (newValue) => {
  if (newValue === true && selectedPostId.value) {
    refreshComments();
  }
});

const goToHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="bg-white rounded-lg p-6 w-full">
      <div class="flex items-center mb-6">
        <IconSquareRoundedArrowLeft
          class="w-8 h-8 text-[#26303E] hover:text-[#3a2673] cursor-pointer"
          @click="goToHome"
        />
        <span
          class="text-[#26303E] hover:text-[#3a2673] font-semibold text-[20px] leading-[20px] ml-2 cursor-pointer"
          @click="goToHome"
        >
          Go Home
        </span>
      </div>

      <div
        v-if="!isLoadingPosts && posts && posts.length > 0"
        class="space-y-6"
      >
        <div
          v-for="post in posts as Post[]"
          :key="post.id"
          class="border-b border-[#D8D9DD] pb-4 last:border-b-0"
        >
          <h2 class="text-lg font-medium text-[#26303E] capitalize mb-2">
            {{ post.title }}
          </h2>
          <p class="text-[#5C6672] mb-3">
            {{ post.body }}
          </p>

          <div class="flex justify-end">
            <div
              class="flex items-center gap-2 cursor-pointer"
              @click="showPostDetails(post)"
            >
              <span class="text-[14px] font-medium text-[#26303E]"
                >See More</span
              >
              <IconSquareRoundedArrowRight class="w-6 h-6 text-[#4F359B]" />
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="isLoadingPosts" class="space-y-6">
        <div v-for="i in 5" :key="i" class="animate-pulse">
          <div class="h-6 bg-accent/30 rounded w-1/4 mb-2"></div>
          <div class="h-4 bg-accent/30 rounded w-full mb-1"></div>
          <div class="h-4 bg-accent/30 rounded w-full mb-1"></div>
          <div class="h-4 bg-accent/30 rounded w-3/4"></div>
          <div class="flex justify-end mt-2">
            <div class="h-8 bg-accent/30 rounded w-24"></div>
          </div>
          <div class="border-t border-[#D8D9DD] mt-4 pt-2"></div>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <p class="text-[#5C6672]">Kullanıcıya ait gönderi bulunamadı.</p>
      </div>
    </div>

    <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
      <DialogContent class="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle class="text-xl font-semibold text-[#26303E]">
            {{ selectedPost?.title }}
          </DialogTitle>
          <DialogHeader> </DialogHeader>
        </DialogHeader>
        <div class="flex">
          <div class="w-1/2 p-6">
            <ScrollArea class="h-[400px] pr-4">
              <div v-if="selectedPost" class="space-y-4">
                <p class="text-[#5C6672] text-base">
                  {{ selectedPost.body }}
                </p>
              </div>
            </ScrollArea>
          </div>

          <div class="w-1/2 p-6 relative">
            <h3 class="font-semibold text-xl text-[#26303E] mb-4">Comments</h3>

            <ScrollArea class="h-[400px] pr-4">
              <div
                v-if="isLoadingComments"
                class="flex justify-center items-center py-4"
              >
                <div
                  class="h-8 w-8 border-4 border-t-[#4F359B] border-r-[#4F359B] border-b-transparent border-l-transparent rounded-full animate-spin"
                ></div>
              </div>
              <div
                v-else-if="comments?.length === 0"
                class="py-4 text-center text-[#5C6672]"
              >
                Bu gönderi için henüz yorum bulunmamaktadır.
              </div>
              <div v-else class="space-y-6">
                <div
                  v-for="comment in comments as Comment[]"
                  :key="comment.id"
                  class="flex gap-3"
                >
                  <div
                    class="w-10 h-10 rounded-full bg-[#4F359B]/20 overflow-hidden flex-shrink-0"
                  >
                    <img
                      :src="`https://i.pravatar.cc/150?u=${comment.id + 10}`"
                      class="w-full h-full object-cover"
                      alt="Avatar"
                    />
                  </div>
                  <div>
                    <h4 class="font-medium text-[#26303E]">
                      {{ comment.email }}
                    </h4>
                    <p class="text-sm text-[#5C6672]">
                      {{
                        comment.body.length > 150
                          ? comment.body.substring(0, 150) + "..."
                          : comment.body
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
