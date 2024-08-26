<template>
  <div class="p-2 overflow-auto h-screen">
    <p class="text-lg text-gray-5 font-medium">Người liên hệ</p>
    <div class="flex flex-col gap-3 items-start justify-center">
      <div
        v-if="loading"
        v-for="friend in friends"
        class="flex items-center justify-start gap-3 w-full p-1"
      >
        <q-skeleton size="40px" type="circle" />
        <q-skeleton size="30px" type="rect" class="!w-[180px]" />
      </div>

      <div
        v-else
        v-for="(friend, index) in friends"
        class="flex items-center justify-start gap-3 hover:bg-bluegray transition-duration-150 ease-linear w-full cursor-pointer p-1 rounded-lg"
        @click="roomClick(String(index))"
      >
        <div class="relative">
          <q-avatar size="40px" class="cursor-pointer">
            <img :src="friend.avatar"
          /></q-avatar>
          <div
            class="absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full bg-green border-1 border-solid border-white"
          ></div>
        </div>
        <span class="text-md">{{ friend.fullname }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { chatStore } from "../stores/chat-store";
import { UserDataType } from "../ts/types";
import { authStore } from "../stores/auth-store";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const chatStr = chatStore();
const authStr = authStore();

const friends = ref<UserDataType[]>([]);
const loading = ref(true);

/**
 * Click event handler for a chat room.
 *
 * @param {string} id - The ID of the chat room.
 * @return {void}
 */
const roomClick = (id: string): void => {
  chatStr.setRooms(id);
};

/**
 * Retrieves all friends from the database and updates the `friends` array.
 *
 * @return {Promise<void>} A Promise that resolves when the friends are retrieved and the `friends` array is updated.
 */
const getAllFriend = async (): Promise<void> => {
  const colRef = collection(db, "users");
  const snapshot = await getDocs(colRef);
  if (snapshot && snapshot.docs.length > 0) {
    const listFriends: UserDataType[] = [];
    for (const doc of snapshot.docs) {
      listFriends.push(doc.data() as UserDataType);
    }
    friends.value = [...listFriends].filter(
      (friend) => friend.id !== authStr.user?.id,
    );
  } else {
    friends.value = [];
  }
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  await getAllFriend();
});
</script>
