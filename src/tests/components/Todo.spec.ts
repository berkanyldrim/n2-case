import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Todo from "@/components/Todo.vue";
import type { Todo as TodoType } from "@/types/todo";

vi.mock("@/components/ui/checkbox", () => ({
  Checkbox: {
    name: "Checkbox",
    render: () => null,
  },
}));

describe("Todo.vue", () => {
  it("todo başlığını doğru şekilde görüntüler", () => {
    const todoItem: TodoType = {
      id: 1,
      userId: 1,
      title: "Test Todo Başlığı",
      completed: false,
    };

    const wrapper = mount(Todo, {
      props: {
        todo: todoItem,
      },
    });

    expect(wrapper.text()).toContain("Test Todo Başlığı");
  });

  it("tamamlanan todo için çizgi gösterir", () => {
    const todoItem: TodoType = {
      id: 2,
      userId: 1,
      title: "Tamamlanan Todo",
      completed: true,
    };

    const wrapper = mount(Todo, {
      props: {
        todo: todoItem,
      },
    });

    const todoText = wrapper.find("p");
    expect(todoText.classes()).toContain("line-through");
    expect(todoText.classes()).toContain("text-gray-500");
  });
});
