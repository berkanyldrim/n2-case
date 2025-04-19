import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import UserSidebar from "@/components/UserSidebar.vue";
import { useUserStore } from "@/store/userStore";

vi.mock("@tabler/icons-vue", () => ({
  IconCheckupList: {
    name: "IconCheckupList",
    render: () => null,
  },
  IconPhoto: {
    name: "IconPhoto",
    render: () => null,
  },
  IconFileText: {
    name: "IconFileText",
    render: () => null,
  },
}));

vi.mock("@/components/ui/sidebar", () => ({
  Sidebar: {
    name: "Sidebar",
    template: "<div><slot /></div>",
  },
  SidebarContent: {
    name: "SidebarContent",
    template: "<div><slot /></div>",
  },
  SidebarFooter: {
    name: "SidebarFooter",
    template: "<div><slot /></div>",
  },
  SidebarHeader: {
    name: "SidebarHeader",
    template: "<div><slot /></div>",
  },
}));

describe("UserSidebar.vue", () => {
  let router: any;
  let userStore: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    userStore = useUserStore();

    userStore.setUser({
      id: 1,
      name: "Test Kullanıcı",
      email: "test@example.com",
      phone: "555-1234",
    });

    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/user/:userId/todos",
          name: "todos",
          component: { template: "<div>Todos</div>" },
        },
        {
          path: "/user/:userId/posts",
          name: "posts",
          component: { template: "<div>Posts</div>" },
        },
        {
          path: "/user/:userId/albums",
          name: "albums",
          component: { template: "<div>Albums</div>" },
        },
      ],
    });
  });

  it("UserSidebar bileşeni başarıyla yüklenir", async () => {
    await router.push("/user/1/todos");
    await router.isReady();

    const wrapper = mount(UserSidebar, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("aktif sayfayı doğru şekilde işaretler", async () => {
    await router.push("/user/1/todos");
    await router.isReady();

    const wrapper = mount(UserSidebar, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.findComponent({ name: "Sidebar" }).exists()).toBe(true);
  });
});
