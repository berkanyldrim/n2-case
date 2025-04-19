<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppSidebar from "./AppSidebar.vue";
import UserSidebar from "./UserSidebar.vue";

const route = useRoute();

const isTodoPage = computed(
  () =>
    route.name === "todos" ||
    route.name === "posts" ||
    route.name === "albums" ||
    route.name === "album-detail"
);
</script>

<template>
  <div class="flex w-full h-screen bg-[#F9FAFB]">
    <UserSidebar v-if="isTodoPage" />
    <AppSidebar v-else />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-auto bg-white">
      <!-- Page Content -->
      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>
