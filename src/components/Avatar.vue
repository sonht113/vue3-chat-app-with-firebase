<template>
  <div class="relative">
    <q-avatar :size="size + 'px'" class="cursor-pointer">
      <img :src="url" />
    </q-avatar>
    <div
      class="absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full bg-green border-1 border-solid border-white"
    ></div>
    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
      <em>{{ name }}</em>
    </q-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Avatar",
  props: {
    size: {
      type: Number,
      default: 40,
    },
    url: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
});
</script>
