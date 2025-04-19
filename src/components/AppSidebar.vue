<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarFooter } from "./ui/sidebar";
import { IconUsers } from "@tabler/icons-vue";
</script>

<template>
  <Sidebar class="w-[240px] border-r border-[#D8D9DD] bg-[#D8D9DD]">
    <SidebarContent class="flex-grow pt-6">
      <div class="flex items-center">
        <div
          class="w-[6px] h-[40px] bg-[#4F359B] rounded-tr-[6px] rounded-br-[6px]"
        ></div>
        <div class="flex items-center gap-2 ml-3">
          <IconUsers class="text-[#4F359B] w-6 h-6" />
          <h1 class="text-[#4F359B] font-medium text-lg">Users</h1>
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
