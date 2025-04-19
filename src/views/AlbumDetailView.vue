<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAlbumPhotos } from "@/composables/useAlbumPhotos";
import {
  IconSquareRoundedArrowLeft,
  IconArrowUpRight,
} from "@tabler/icons-vue";

const route = useRoute();
const router = useRouter();
const userId = Number(route.params.userId);
const albumIdParam = Number(route.params.albumId);

// Ref olarak albumId tanımlayalım
const albumId = ref(albumIdParam);

// Album ve fotoğraf verilerini composable ile alalım
const { data: photos, album, isLoading } = useAlbumPhotos(albumId);

// Albümler sayfasına geri dön
const goToAlbums = () => {
  router.push(`/user/${userId}/albums`);
};
</script>

<template>
  <div class="flex">
    <div class="flex flex-col w-full">
      <div class="bg-white rounded-lg p-6 w-full">
        <div class="flex items-center mb-6">
          <IconSquareRoundedArrowLeft
            class="w-8 h-8 text-[#26303E] hover:text-[#3a2673] cursor-pointer"
            @click="goToAlbums"
          />
          <span
            class="text-[#26303E] hover:text-[#3a2673] font-semibold text-[20px] leading-[20px] ml-2 cursor-pointer"
            @click="goToAlbums"
          >
            Go Albums
          </span>
        </div>

        <div v-if="isLoading" class="py-8 flex justify-center">
          <div
            class="w-10 h-10 border-4 border-t-[#4F359B] border-r-[#4F359B] border-b-transparent border-l-transparent rounded-full animate-spin"
          ></div>
        </div>

        <div v-else-if="album && photos.length">
          <div class="flex flex-wrap gap-2">
            <div
              v-for="photo in photos"
              :key="photo.id"
              class="w-[150px] h-[150px] overflow-hidden rounded-lg border border-[#E5E7EB] hover:shadow-md transition-all cursor-pointer"
            >
              <img
                :src="photo.thumbnailUrl"
                :alt="photo.title"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-[#5C6672]">Albüm fotoğrafları bulunamadı.</p>
        </div>
      </div>
    </div>
  </div>
</template>
