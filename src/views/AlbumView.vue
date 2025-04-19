<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAlbum } from "@/composables/useAlbum";
import {
  IconSquareRoundedArrowLeft,
  IconArrowUpRight,
} from "@tabler/icons-vue";

const route = useRoute();
const router = useRouter();
const userId = Number(route.params.userId);

// JSONPlaceholder API'den albümleri getir
const { data: albums, isLoading } = useAlbum(userId);

// Ana sayfaya dön
const goToHome = () => {
  router.push("/");
};

// Albüm detay sayfasına git
const goToAlbumDetail = (albumId) => {
  router.push(`/user/${userId}/albums/${albumId}`);
};
</script>

<template>
  <div class="flex">
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

        <!-- Yükleniyor Durumu -->
        <div
          v-if="isLoading"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="i in 9"
            :key="i"
            class="animate-pulse border rounded-xl overflow-hidden p-4"
          >
            <div class="grid grid-cols-2 gap-1">
              <div class="aspect-square bg-accent/30 rounded-md"></div>
              <div class="aspect-square bg-accent/30 rounded-md"></div>
              <div class="aspect-square bg-accent/30 rounded-md"></div>
              <div class="aspect-square bg-accent/30 rounded-md"></div>
            </div>
            <div class="mt-2">
              <div class="h-4 bg-accent/30 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        <!-- Albüm Grid -->
        <div
          v-else-if="albums && albums.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="album in albums"
            :key="album.id"
            class="border border-[#D8D9DD] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white p-4"
            @click="goToAlbumDetail(album.id)"
          >
            <div class="grid grid-cols-2 gap-1">
              <div
                class="aspect-square bg-[#F3F4F6] overflow-hidden rounded-md"
              >
                <img
                  :src="`https://picsum.photos/150?random=${album.id * 4 + 1}`"
                  class="w-full h-full object-cover"
                  alt="Album image"
                />
              </div>
              <div
                class="aspect-square bg-[#F3F4F6] overflow-hidden rounded-md"
              >
                <img
                  :src="`https://picsum.photos/150?random=${album.id * 4 + 2}`"
                  class="w-full h-full object-cover"
                  alt="Album image"
                />
              </div>
              <div
                class="aspect-square bg-[#F3F4F6] overflow-hidden rounded-md"
              >
                <img
                  :src="`https://picsum.photos/150?random=${album.id * 4 + 3}`"
                  class="w-full h-full object-cover"
                  alt="Album image"
                />
              </div>
              <div
                class="aspect-square bg-[#F3F4F6] overflow-hidden rounded-md"
              >
                <img
                  :src="`https://picsum.photos/150?random=${album.id * 4 + 4}`"
                  class="w-full h-full object-cover"
                  alt="Album image"
                />
              </div>
            </div>

            <div class="mt-2">
              <p class="text-[14px] text-[#26303E] font-normal truncate">
                Non esse culpa molestiae omnis sed ol...
              </p>
            </div>
          </div>
        </div>

        <!-- Veri Yok Durumu -->
        <div v-else class="text-center py-12">
          <p class="text-[#5C6672]">Kullanıcıya ait albüm bulunamadı.</p>
        </div>
      </div>
    </div>
  </div>
</template>
