import { defineStore } from "pinia";

export interface UserStoreType {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    selectedUser: null as UserStoreType | null,
  }),
  actions: {
    setUser(user: UserStoreType) {
      this.selectedUser = user;
      localStorage.setItem("selectedUser", JSON.stringify(user));
    },
    loadUser() {
      const user = localStorage.getItem("selectedUser");
      if (user) {
        this.selectedUser = JSON.parse(user);
      }
    },
  },
});
