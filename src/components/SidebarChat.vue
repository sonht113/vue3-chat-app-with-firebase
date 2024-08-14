<template>
  <div class="p-2 overflow-scroll h-screen">
    <p class="text-lg text-gray-5 font-medium">Người liên hệ</p>
    <div class="flex flex-col gap-3 items-start justify-center">
      <div
        v-for="i in 100"
        class="flex items-center justify-start gap-3 hover:bg-bluegray transition-duration-150 ease-linear w-full cursor-pointer p-1"
        @click="roomClick(String(i))"
      >
        <div class="relative">
          <q-avatar size="40px" class="cursor-pointer">
            <img src="https://cdn.quasar.dev/img/avatar4.jpg"
          /></q-avatar>
          <div
            class="absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full bg-green border-1 border-solid border-white"
          ></div>
        </div>
        <span class="text-md">Ho Trong Son</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { chatStore } from "../stores/chat-store";

const chatStr = chatStore();
const roomClick = (id: string) => {
  chatStr.setRooms(id);
};
</script>
