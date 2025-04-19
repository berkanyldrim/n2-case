import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/components/AppLayout.vue";

vi.mock("@/components/AppSidebar.vue", () => ({
  default: {
    name: "AppSidebar",
    render: () => null,
  },
}));

vi.mock("@/components/UserSidebar.vue", () => ({
  default: {
    name: "UserSidebar",
    render: () => null,
  },
}));

describe("AppLayout.vue", () => {
  let router: any;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/",
          name: "home",
          component: { template: "<div>Home</div>" },
        },
        {
          path: "/user/:userId/todos",
          name: "todos",
          component: { template: "<div>Todos</div>" },
        },
      ],
    });
  });

  it("ana sayfada AppSidebar gösterilir", async () => {
    await router.push("/");
    await router.isReady();

    const wrapper = mount(AppLayout, {
      global: {
        plugins: [router],
        stubs: ["router-view"],
      },
    });

    expect(wrapper.findComponent({ name: "AppSidebar" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "UserSidebar" }).exists()).toBe(false);
  });

  it("todos sayfasında UserSidebar gösterilir", async () => {
    await router.push("/user/1/todos");
    await router.isReady();

    const wrapper = mount(AppLayout, {
      global: {
        plugins: [router],
        stubs: ["router-view"],
      },
    });

    expect(wrapper.findComponent({ name: "AppSidebar" }).exists()).toBe(false);
    expect(wrapper.findComponent({ name: "UserSidebar" }).exists()).toBe(true);
  });
});
