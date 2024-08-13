<script setup lang="ts">
import { doc, getDoc } from "firebase/firestore";
import { userStore } from "../stores/user-store";
import sessionStorageUtils from "../utils/storage";
import AppLayoutDefault from "./AppLayoutDefault.vue";
import BaseLayout from "./BaseLayout.vue";
import { markRaw, onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { db } from "../firebase";
import { UserDataType } from "../ts/types";

const layout = ref();
const route = useRoute();
const userStr = userStore();

onBeforeMount(async () => {
  const user = userStr.user;
  const id = sessionStorageUtils.get("id");
  if (id && !user) {
    await getDoc(doc(db, "users", id)).then((res) => {
      const data = res.data();
      if (data) {
        userStr.setUser(data as UserDataType);
      }
    });
  }
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
