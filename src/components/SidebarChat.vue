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
        <q-spinner-ios color="amber" size="2em" />
      </div>

      <div
        v-else
        v-for="friend in friends"
        class="flex items-center justify-start gap-3 hover:bg-bluegray transition-duration-150 ease-linear w-full cursor-pointer p-1 rounded-lg group"
        @click="roomClick(friend)"
      >
        <div class="relative">
          <q-avatar size="40px" class="cursor-pointer">
            <img :src="friend.avatar || PATH_AVATAR_DEAULT"
          /></q-avatar>
          <div
            class="absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full bg-green border-1 border-solid border-white"
          ></div>
        </div>
        <div class="flex flex-col items-start">
          <span class="text-md">{{ friend.fullname }}</span>
          <small
            v-if="showLatestMessage"
            class="text-gray-500 group-hover:text-white"
            >Hello em</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { chatStore } from "@/stores/chat-store";
import { RoomDataType, UserDataType } from "@/ts/types";
import { authStore } from "@/stores/auth-store";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { PATH_AVATAR_DEAULT } from "@/utils/constant";

const props = defineProps({
  height: {
    type: String,
    default: "screen",
    required: false,
  },
  showLatestMessage: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const chatStr = chatStore();
const authStr = authStore();

const friends = ref<UserDataType[]>([]);
const loading = ref(true);

const owner = computed(() => authStr.user);

/**
 * Click event handler for a chat room.
 * @param {string} friend - The ID of the chat room.
 * @return {void}
 */
const roomClick = async (friend: UserDataType): Promise<void> => {
  if (owner.value?.id) {
    const idRoom =
      owner.value.id > friend.id
        ? owner.value.id + friend.id
        : friend.id + owner.value.id;

    const responseRoom = await getDoc(doc(db, "rooms", idRoom));

    if (responseRoom.exists()) {
      const room = responseRoom.data();
      chatStr.setRooms(room as RoomDataType);
    } else {
      const room = {
        id: idRoom,
        latestMessage: "",
        members: {
          [friend.id]: {
            id: owner.value.id,
            avatar: owner.value.avatar,
            fullname: owner.value.fullname,
          },
          [owner.value.id as string]: {
            id: friend.id,
            avatar: friend.avatar,
            fullname: friend.fullname,
          },
        },
      };
      await createRoom(room);
      const responseRoom = await getDoc(doc(db, "rooms", idRoom));
      const r = responseRoom.data();
      chatStr.setRooms(r as RoomDataType);
    }
  }
};

const createRoom = async (
  room: Pick<RoomDataType, "id" | "latestMessage" | "members">,
) => {
  const snapshot = await setDoc(doc(db, "rooms", room.id), { ...room });

  console.log(snapshot);
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
