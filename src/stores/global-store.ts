import { defineStore } from "pinia";

export const globalStore = defineStore("global", {
  state: () => {
    return {
      loading: false,
    };
  },
  actions: {
    setLoading(payload: boolean) {
      this.loading = payload;
    },
  },
});
