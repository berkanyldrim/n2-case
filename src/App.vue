<script setup lang="ts">
import { SidebarProvider } from "./components/ui/sidebar";
import AppLayout from "./components/AppLayout.vue";
import { onMounted } from "vue";
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUser();
});
</script>

<template>
  <SidebarProvider>
    <AppLayout />
  </SidebarProvider>
</template>
