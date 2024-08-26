<template>
  <Header />
  <div class="mt-[70px] relative z-0">
    <div
      class="fixed top-[70px] left-0 w-[300px] h-screen bg-amber sm:hidden md:hidden lg:block"
    >
      sidebar chat
    </div>
    <slot />
    <div
      class="fixed top-[70px] right-0 w-[300px] h-screen sm:hidden md:block bg-gray-2"
    >
      <sidebar-chat />
    </div>
    <div
      class="flex flex-nowrap gap-2 fixed bottom-0 right-[80px] sm:hidden md:flex"
    >
      <box-chat v-for="room in rooms" :room="room" />
    </div>
    <div class="flex flex-col gap-2 fixed bottom-8 right-6 sm:hidden md:flex">
      <avatar
        v-for="smallRoom in smallRooms"
        :size="50"
        url="https://cdn.quasar.dev/img/avatar4.jpg"
        @click="onCloseSmallRoom(smallRoom)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "../components/Header.vue";
import SidebarChat from "../components/SidebarChat.vue";
import BoxChat from "../components/BoxChat.vue";
import Avatar from "../components/Avatar.vue";

import { chatStore } from "../stores/chat-store";

const chatStr = chatStore();

const rooms = chatStr.rooms;
const smallRooms = chatStr.smallRooms;

/**
 * Closes a small room.
 *
 * @param {string} id - The ID of the room to close.
 */
const onCloseSmallRoom = (id: string): void => {
  chatStr.closeSmallRoom(id);
};
</script>
