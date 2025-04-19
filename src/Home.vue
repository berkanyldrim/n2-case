<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUser } from "@/composables/useUser";
import { useUserStore } from "@/store/userStore";
import type { UserStoreType } from "@/store/userStore";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  IconMapPinHeart,
  IconBuildingSkyscraper,
  IconWorldShare,
} from "@tabler/icons-vue";

const router = useRouter();
const userStore = useUserStore();
const { data, isLoading } = useUser();

const navigateToTodos = (userId: number) => {
  const selectedUser = data.value?.find(
    (user: UserStoreType) => user.id === userId
  );
  if (selectedUser) {
    userStore.setUser({
      id: selectedUser.id,
      name: selectedUser.name,
      email: selectedUser.email,
      phone: selectedUser.phone,
    });
    router.push(`/user/${userId}/todos`);
  }
};
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="bg-white rounded-lg p-6 w-full">
      <div
        v-if="!isLoading"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 4xl:grid-cols-4 gap-4 sm:gap-6"
      >
        <Card
          v-for="user in data"
          :key="user.id"
          class="shadow-sm transition-all duration-200 hover:shadow-lg group cursor-pointer border border-gray-200 hover:border-gray-300"
          @click="navigateToTodos(user.id)"
        >
          <CardHeader class="p-4 sm:p-6">
            <div class="flex items-start gap-2 sm:gap-4">
              <Avatar
                class="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px]"
              >
                <AvatarImage
                  :src="`https://i.pravatar.cc/150?u=${user.id}`"
                  :alt="user.name"
                />
                <AvatarFallback>{{ user.name.charAt(0) }}</AvatarFallback>
              </Avatar>

              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-[#26303E] text-sm md:text-base truncate"
                >
                  {{ user.name }}
                </h3>
                <p class="text-xs md:text-sm text-[#5C6672] truncate">
                  {{ user.email }}
                </p>
                <p class="text-xs md:text-sm text-[#5C6672] truncate">
                  {{ user.phone }}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent class="p-4 sm:p-6 pt-0 sm:pt-0">
            <div class="flex flex-col gap-2">
              <div class="flex flex-col gap-1 sm:gap-2">
                <div class="flex items-center gap-2">
                  <IconMapPinHeart
                    class="w-5 h-5 sm:w-6 sm:h-6 text-[#26303E] flex-shrink-0"
                  />
                  <p class="text-xs sm:text-sm font-medium text-[#26303E]">
                    Location
                  </p>
                </div>

                <div>
                  <p class="text-xs sm:text-sm text-[#5C6672] truncate">
                    {{ user.address.street }}
                  </p>
                  <p class="text-xs sm:text-sm text-[#5C6672] truncate">
                    {{ user.address.city }}
                  </p>
                </div>
              </div>

              <div class="flex flex-col gap-1 sm:gap-2">
                <div class="flex items-center gap-2">
                  <IconBuildingSkyscraper
                    class="w-5 h-5 sm:w-6 sm:h-6 text-[#26303E] flex-shrink-0"
                  />
                  <p class="text-xs sm:text-sm font-medium text-[#26303E]">
                    Company
                  </p>
                </div>
                <div>
                  <p class="text-xs sm:text-sm text-[#5C6672] truncate">
                    {{ user.company.name }}
                  </p>
                </div>
              </div>

              <div class="flex flex-col gap-1 sm:gap-2">
                <div class="flex items-center gap-2">
                  <IconWorldShare
                    class="w-5 h-5 sm:w-6 sm:h-6 text-[#26303E] flex-shrink-0"
                  />
                  <p class="text-xs sm:text-sm font-medium text-[#26303E]">
                    Website
                  </p>
                </div>
                <div>
                  <p class="text-xs sm:text-sm text-[#5C6672] truncate">
                    {{ user.website }}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      >
        <div
          v-for="i in 8"
          :key="i"
          class="rounded-xl border border-[#D8D9DD] bg-white p-4 sm:p-6 shadow-sm"
        >
          <div class="flex flex-col space-y-3 sm:space-y-4 animate-pulse">
            <div class="flex items-start gap-2 sm:gap-4">
              <div
                class="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-accent/30"
              ></div>
              <div class="flex-1 space-y-1 sm:space-y-2">
                <div class="h-3 sm:h-4 rounded bg-accent/30 w-3/4"></div>
                <div class="h-2 sm:h-3 rounded bg-accent/30 w-1/2"></div>
                <div class="h-2 sm:h-3 rounded bg-accent/30 w-1/2"></div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div
                class="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-accent/30"
              ></div>
              <div class="space-y-1 flex-1">
                <div class="h-2 sm:h-3 rounded bg-accent/30 w-full"></div>
                <div class="h-2 sm:h-3 rounded bg-accent/30 w-2/3"></div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div
                class="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-accent/30"
              ></div>
              <div class="space-y-1 flex-1">
                <div class="h-2 sm:h-3 rounded bg-accent/30 w-full"></div>
                <div class="h-2 sm:h-3 rounded bg-accent/30 w-2/3"></div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div
                class="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-accent/30"
              ></div>
              <div class="h-2 sm:h-3 rounded bg-accent/30 w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
