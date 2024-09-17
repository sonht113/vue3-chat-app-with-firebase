<template>
  <div :class="'p-2 overflow-auto' + `min-h-${props.height}`">
    <p
      class="text-lg text-gray-5 font-medium border-b-1 border-gray border-b-solid"
    >
      Người liên hệ
    </p>
    <div class="flex flex-col gap-3 items-start justify-center">
      <div
        v-if="loading"
        class="flex items-center justify-center gap-3 w-full p-1"
      >
        <q-spinner-ios color="blue-9" size="2em" />
      </div>

      <div
        v-else
        v-for="room in rooms"
        class="flex items-center justify-start gap-3 hover:bg-bluegray transition-duration-150 ease-linear w-full cursor-pointer p-1 rounded-lg group"
        @click="roomClick(room)"
      >
        <div class="relative">
          <q-avatar size="40px" class="cursor-pointer">
            <img :src="room.members[idOwner!].avatar || PATH_AVATAR_DEAULT"
          /></q-avatar>
          <div
            class="absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full bg-green border-1 border-solid border-white"
          ></div>
        </div>
        <div class="flex flex-col items-start">
          <span class="text-md">{{ room.members[idOwner!].fullname }}</span>
          <small class="text-gray-500 group-hover:text-white">{{
            room.latestMessage
          }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { chatStore } from "@/stores/chat-store";
import { RoomDataType } from "@/ts/types";
import { authStore } from "@/stores/auth-store";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { PATH_AVATAR_DEAULT } from "@/utils/constant";

const props = defineProps({
  height: {
    type: String,
    default: "screen",
    required: false,
  },
});

const chatStr = chatStore();
const authStr = authStore();

const rooms = ref<RoomDataType[]>([]);
const loading = ref(true);

const idOwner = computed(() => authStr.user?.id);

/**
 * Click event handler for a chat room.
 * @param {string} room - The ID of the chat room.
 * @return {void}
 */
const roomClick = (room: RoomDataType): void => {
  chatStr.setRooms(room);
};

/**
 * Retrieves all rooms from the database and updates the `rooms` array.
 *
 * @return {Promise<void>} A Promise that resolves when the rooms are retrieved and the `rooms` array is updated.
 */
const getAllRoom = async (): Promise<void> => {
  loading.value = true;
  const colRef = collection(db, "rooms");
  const snapshot = await getDocs(colRef);
  if (snapshot && snapshot.docs.length > 0) {
    const listRooms: RoomDataType[] = [];
    for (const doc of snapshot.docs) {
      if (
        Object.keys(doc.data().members).includes(authStr.user?.id as string)
      ) {
        listRooms.push(doc.data() as RoomDataType);
      }
    }
    rooms.value = [...listRooms];
  } else {
    rooms.value = [];
  }
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  await getAllRoom();
});
</script>
