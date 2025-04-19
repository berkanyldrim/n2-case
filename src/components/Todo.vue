<script setup lang="ts">
import { ref } from "vue";
import type { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";

const props = defineProps<{
  todo: Todo;
}>();

const isCompleted = ref(props.todo.completed);
</script>

<template>
  <div class="flex items-start gap-3 py-3 px-2">
    <div class="mt-0.5">
      <Checkbox :model-value="isCompleted" />
    </div>
    <div>
      <p
        :class="[
          'text-sm transition-colors',
          isCompleted ? 'text-gray-500 line-through' : 'text-[#26303E]',
        ]"
      >
        {{ todo.title }}
      </p>
    </div>
  </div>
</template>
