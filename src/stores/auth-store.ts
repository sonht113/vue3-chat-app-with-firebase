import { defineStore } from "pinia";
import { UserDataType } from "../ts/types";

export const authStore = defineStore("users", {
  state: () => {
    return {
      user: null as UserDataType | null,
    };
  },
  actions: {
    setUser(user: UserDataType | null) {
      this.user = user;
    },
  },
});
