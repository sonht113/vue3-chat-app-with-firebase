<script setup lang="ts">
import AppLayoutDefault from "./AppLayoutDefault.vue";
import BaseLayout from "./BaseLayout.vue";
import { markRaw, ref, watch } from "vue";
import { useRoute } from "vue-router";

const layout = ref();
const route = useRoute();

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
