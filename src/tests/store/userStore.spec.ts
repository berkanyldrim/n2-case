import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useUserStore, type UserStoreType } from "@/store/userStore";

describe("UserStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("kullanıcı bilgilerini doğru şekilde saklar", () => {
    const userStore = useUserStore();
    const testUser: UserStoreType = {
      id: 1,
      name: "Test Kullanıcı",
      email: "test@example.com",
      phone: "555-1234",
    };

    userStore.setUser(testUser);

    expect(userStore.selectedUser).toEqual(testUser);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "selectedUser",
      JSON.stringify(testUser)
    );
  });

  it("localStorage'dan kullanıcıyı doğru şekilde yükler", () => {
    const userStore = useUserStore();
    const storedUser: UserStoreType = {
      id: 2,
      name: "Kaydedilmiş Kullanıcı",
      email: "stored@example.com",
      phone: "555-5678",
    };

    vi.mocked(localStorage.getItem).mockReturnValueOnce(
      JSON.stringify(storedUser)
    );

    userStore.loadUser();

    expect(userStore.selectedUser).toEqual(storedUser);
    expect(localStorage.getItem).toHaveBeenCalledWith("selectedUser");
  });

  it("localStorage boşsa selectedUser null olmalıdır", () => {
    const userStore = useUserStore();

    vi.mocked(localStorage.getItem).mockReturnValueOnce(null);

    userStore.loadUser();

    expect(userStore.selectedUser).toBeNull();
  });
});
