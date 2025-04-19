<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useTodo } from "@/composables/useTodo";
import { IconSquareRoundedArrowLeft } from "@tabler/icons-vue";

import Todo from "@/components/Todo.vue";

const route = useRoute();
const router = useRouter();
const userId = Number(route.params.userId);

const { data: todos, isLoading: isLoadingTodos } = useTodo(userId);

const goToHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="bg-white rounded-lg p-6 w-full">
      <div class="flex items-center mb-6">
        <IconSquareRoundedArrowLeft
          class="w-8 h-8 text-[#26303E] hover:text-[#3a2673]"
          @click="goToHome"
        />

        <span
          class="text-[#26303E] hover:text-[#3a2673] font-semibold text-[20px] leading-[20px] ml-2 cursor-pointer"
          @click="goToHome"
        >
          Go Home
        </span>
      </div>

      <div v-if="!isLoadingTodos && todos && todos.length > 0" class="mt-6">
        <div class="divide-y divide-[#D8D9DD]">
          <Todo v-for="todo in todos" :key="todo.id" :todo="todo" />
        </div>
      </div>

      <div v-else-if="isLoadingTodos" class="mt-6">
        <div class="animate-pulse space-y-3">
          <div v-for="i in 8" :key="i" class="h-10 bg-accent/30 rounded"></div>
        </div>
      </div>

      <div v-else class="text-center p-8">
        <p class="text-[#5C6672]">Kullanıcıya ait görevler bulunamadı.</p>
      </div>
    </div>
  </div>
</template>
