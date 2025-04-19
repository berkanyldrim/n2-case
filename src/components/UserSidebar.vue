<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";
import { IconCheckupList, IconPhoto, IconFileText } from "@tabler/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/userStore";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const user = computed(() => userStore.selectedUser);
const userId = computed(() => route.params.userId);

const goToRoute = (path: string) => {
  router.push(path);
};

const isActivePage = (routeName: string) => {
  if (routeName === "albums" && route.name === "album-detail") {
    return true;
  }
  return route.name === routeName;
};
</script>

<template>
  <Sidebar class="w-[240px] border-r border-[#D8D9DD] bg-white">
    <SidebarHeader class="p-6 border-b border-[#D8D9DD]">
      <div v-if="user" class="flex flex-row items-start justify-center gap-1">
        <div class="w-10 h-10 rounded-full overflow-hidden">
          <img
            :src="`https://i.pravatar.cc/150?u=${user.id}`"
            alt="User avatar"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex flex-col items-start gap-1">
          <span class="text-[#26303E] text-lg font-medium">
            {{ user.name }}
          </span>
          <span class="text-[#5C6672] text-sm underline">{{ user.email }}</span>
        </div>
      </div>
    </SidebarHeader>

    <SidebarContent class="py-4">
      <div class="relative flex items-center h-[56px]">
        <div
          v-if="isActivePage('todos')"
          class="absolute left-0 w-[6px] h-[40px] bg-[#4F359B] rounded-tr-[6px] rounded-br-[6px] my-auto"
        ></div>
        <div
          class="flex items-center h-[40px] px-6 w-full cursor-pointer hover:bg-[#F5F5F7]"
          @click="goToRoute(`/user/${userId}/todos`)"
        >
          <IconCheckupList
            class="w-[24px] h-[24px] mr-3"
            :class="isActivePage('todos') ? 'text-[#4F359B]' : 'text-[#26303E]'"
          />
          <span
            class="font-[400px] text-[18px]"
            :class="isActivePage('todos') ? 'text-[#4F359B]' : 'text-[#26303E]'"
          >
            Todos
          </span>
        </div>
      </div>

      <div class="relative flex items-center h-[56px]">
        <div
          v-if="isActivePage('posts')"
          class="absolute left-0 w-[6px] h-[40px] bg-[#4F359B] rounded-tr-[6px] rounded-br-[6px] my-auto"
        ></div>
        <div
          class="flex items-center h-[56px] px-6 w-full cursor-pointer hover:bg-[#F5F5F7]"
          @click="goToRoute(`/user/${userId}/posts`)"
        >
          <IconFileText
            class="w-[24px] h-[24px] mr-3"
            :class="isActivePage('posts') ? 'text-[#4F359B]' : 'text-[#26303E]'"
          />
          <span
            class="font-[400px] text-[18px]"
            :class="isActivePage('posts') ? 'text-[#4F359B]' : 'text-[#26303E]'"
          >
            Posts
          </span>
        </div>
      </div>

      <div class="relative flex items-center h-[56px]">
        <div
          v-if="isActivePage('albums')"
          class="absolute left-0 w-[6px] h-[40px] bg-[#4F359B] rounded-tr-[6px] rounded-br-[6px] my-auto"
        ></div>
        <div
          class="flex items-center h-[56px] px-6 w-full cursor-pointer hover:bg-[#F5F5F7]"
          @click="goToRoute(`/user/${userId}/albums`)"
        >
          <IconPhoto
            class="w-[24px] h-[24px] mr-3"
            :class="
              isActivePage('albums') ? 'text-[#4F359B]' : 'text-[#26303E]'
            "
          />
          <span
            class="font-[400px] text-[18px]"
            :class="
              isActivePage('albums') ? 'text-[#4F359B]' : 'text-[#26303E]'
            "
          >
            Albums
          </span>
        </div>
      </div>
    </SidebarContent>

    <SidebarFooter class="border-t border-[#D8D9DD] p-4">
      <div class="flex items-center space-x-2">
        <img src="/images/logo.png" alt="Logo" class="w-8 h-8" />
        <h1 class="text-[#485B69] font-semibold">N2Mobil</h1>
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
