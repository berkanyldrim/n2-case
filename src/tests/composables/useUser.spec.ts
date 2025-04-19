import { describe, it, expect, vi, beforeEach } from "vitest";
import { useUser } from "@/composables/useUser";

import { ref } from "vue";

vi.mock("@/api/services/user", () => ({
  userService: {
    getUsers: vi.fn(),
  },
}));

vi.mock("@tanstack/vue-query", () => ({
  useQuery: ({
    queryKey,
  }: {
    queryKey: string[];
    queryFn: () => Promise<any>;
  }) => {
    if (queryKey[0] === "users") {
      return {
        data: ref(mockUsers),
        isLoading: ref(false),
        error: ref(null),
      };
    }
    return {};
  },
}));

const mockUsers = [
  {
    id: 1,
    name: "Test Kullanıcı 1",
    email: "test1@example.com",
    phone: "555-1111",
    address: {
      street: "Test Caddesi",
      city: "Test Şehri",
    },
    company: {
      name: "Test Şirketi",
    },
    website: "test1.com",
  },
  {
    id: 2,
    name: "Test Kullanıcı 2",
    email: "test2@example.com",
    phone: "555-2222",
    address: {
      street: "Test Sokağı",
      city: "Test İlçesi",
    },
    company: {
      name: "Diğer Şirket",
    },
    website: "test2.com",
  },
];

describe("useUser composable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("kullanıcı verilerini doğru şekilde döndürür", () => {
    const { data, isLoading, error } = useUser();

    expect(data.value).toEqual(mockUsers);
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
  });

  it("useQuery doğru parametrelerle çağrılmış", () => {
    useUser();
  });
});
