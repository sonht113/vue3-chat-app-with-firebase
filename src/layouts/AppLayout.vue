<script setup lang="ts">
import { doc, getDoc } from "firebase/firestore";
import { authStore } from "@/stores/auth-store";
import { globalStore } from "@/stores/global-store";
import sessionStorageUtils from "@/utils/storage";
import AppLayoutDefault from "./AppLayoutDefault.vue";
import BaseLayout from "./BaseLayout.vue";
import { markRaw, onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { db } from "@/firebase";
import { UserDataType } from "@/ts/types";

const layout = ref();
const route = useRoute();
const authStr = authStore();
const globalStr = globalStore();

onBeforeMount(async () => {
  globalStr.setLoading(true);
  const user = authStr.user;
  const id = sessionStorageUtils.get("id");
  if (id && !user) {
    await getDoc(doc(db, "users", id)).then((res) => {
      const data = res.data();
      if (data) {
        authStr.setUser(data as UserDataType);
      }
    });
  }
  globalStr.setLoading(false);
});

watch(
  () => route.meta?.layout as string | undefined,
  async (metaLayout) => {
    try {
      if (metaLayout) {
        const component =
          metaLayout &&
          (await import(/* @vite-ignore */ `./${metaLayout}.vue`));
        layout.value = markRaw(component?.default || AppLayoutDefault);
      } else {
        layout.value = markRaw(BaseLayout);
      }
    } catch (e) {
      layout.value = markRaw(BaseLayout);
    }
  },
  { immediate: true },
);
</script>

<template>
  <component :is="layout"> <router-view /> </component>
</template>
