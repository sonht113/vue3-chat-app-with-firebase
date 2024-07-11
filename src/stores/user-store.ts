import { defineStore } from "pinia";
import { UserDataType } from "../ts/types";

export const userStore = defineStore("users", {
  state: () => {
    return {
      user: null as UserDataType | null,
    };
  },
  actions: {
    setUser(user: UserDataType) {
      this.user = user;
    },
  },
});
