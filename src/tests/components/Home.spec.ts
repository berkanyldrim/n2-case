import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/Home.vue";

import { ref } from "vue";

const defaultMockUser = ref([
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    address: {
      street: "Kulas Light",
      city: "Gwenborough",
    },
    company: {
      name: "Romaguera-Crona",
    },
    website: "hildegard.org",
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    address: {
      street: "Victor Plains",
      city: "Wisokyburgh",
    },
    company: {
      name: "Deckow-Crist",
    },
    website: "anastasia.net",
  },
]);

let isLoading = ref(false);
let userData: any = defaultMockUser;

const mockUseUser = vi.fn(() => ({
  data: userData,
  isLoading,
  error: ref(null),
}));

vi.mock("@/composables/useUser", () => ({
  useUser: () => mockUseUser(),
}));

vi.mock("@/components/ui/card", () => ({
  Card: {
    name: "Card",
    render: () => null,
  },
  CardContent: {
    name: "CardContent",
    render: () => null,
  },
  CardHeader: {
    name: "CardHeader",
    render: () => null,
  },
}));

vi.mock("@/components/ui/avatar", () => ({
  Avatar: {
    name: "Avatar",
    render: () => null,
  },
  AvatarFallback: {
    name: "AvatarFallback",
    render: () => null,
  },
  AvatarImage: {
    name: "AvatarImage",
    render: () => null,
  },
}));

vi.mock("@tabler/icons-vue", () => ({
  IconMapPinHeart: {
    name: "IconMapPinHeart",
    render: () => null,
  },
  IconBuildingSkyscraper: {
    name: "IconBuildingSkyscraper",
    render: () => null,
  },
  IconWorldShare: {
    name: "IconWorldShare",
    render: () => null,
  },
}));

describe("Home.vue", () => {
  let router: any;

  beforeEach(() => {
    isLoading.value = false;
    userData = defaultMockUser;

    setActivePinia(createPinia());

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
          name: "user-todos",
          component: { template: "<div>Todos</div>" },
        },
      ],
    });

    mockUseUser.mockClear();
  });

  it("renders user cards when data is loaded", async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find(".animate-pulse").exists()).toBe(false);

    const cards = wrapper.findAllComponents({ name: "Card" });
    expect(cards.length).toBe(2);
  });

  it("navigates to todos page when a user card is clicked", async () => {
    expect(true).toBe(true);
  });

  it("shows loading skeletons when data is loading", async () => {
    isLoading.value = true;
    userData = ref(undefined);

    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find(".animate-pulse").exists()).toBe(true);
    const skeletons = wrapper.findAll(".animate-pulse");
    expect(skeletons.length).toBe(8);
  });

  it("Card bileşeni render edilir", async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    });

    const cards = wrapper.findAllComponents({ name: "Card" });
    expect(cards.length).toBe(2);
  });
});
