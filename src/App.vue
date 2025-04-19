<script setup lang="ts">
import { SidebarProvider } from "./components/ui/sidebar";
import AppLayout from "./components/AppLayout.vue";
</script>

<template>
  <SidebarProvider>
    <AppLayout />
  </SidebarProvider>
</template>
