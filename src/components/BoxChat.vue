<template>
  <div class="relative w-[320px] h-[400px] bg-white rounded-t-lg">
    <div
      class="flex items-center justify-between gap-2 border-b-1 border-b-solid border-b-gray-1"
    >
      <div
        class="flex items-center gap-2 p-2 hover:bg-gray-2 rounded-md cursor-pointer"
      >
        <avatar
          :size="35"
          :url="room.members[idUser!]?.avatar || PATH_AVATAR_DEAULT"
        />
        <div class="flex flex-col">
          <span class="font-bold text-gray-6 text-sm">{{
            room.members[idUser!]?.fullname
          }}</span>
          <span class="text-trueGray font-medium text-xs">Đang hoạt động</span>
        </div>
        <font-awesome-icon
          :icon="['fas', 'chevron-down']"
          class="text-gray text-xs cursor-pointer"
        />
      </div>
      <div class="flex items-center gap-3 pr-4">
        <div
          class="flex items-center justify-center cursor-pointer w-[30px] h-[30px] rounded-full hover:bg-gray-2"
          @click="onMinimizeRoom"
        >
          <font-awesome-icon
            :icon="['fas', 'minus']"
            class="text-gray text-xl"
          />
          <q-tooltip
            anchor="top middle"
            self="bottom middle"
            :offset="[10, 10]"
          >
            <em>Thu nhỏ cửa sổ</em>
          </q-tooltip>
        </div>
        <div
          class="flex items-center justify-center cursor-pointer w-[30px] h-[30px] rounded-full hover:bg-gray-2"
          @click="onCloseRoom"
        >
          <font-awesome-icon
            :icon="['fas', 'xmark']"
            class="text-gray text-xl cursor-pointer"
          />
          <q-tooltip
            anchor="top middle"
            self="bottom middle"
            :offset="[10, 10]"
          >
            <em>Đóng cửa sổ</em>
          </q-tooltip>
        </div>
      </div>
    </div>
    <div class="relative h-[285px]">
      <div
        v-if="loadingMessage"
        class="absolute top-0 left-0 flex items-center justify-center gap-3 w-full p-1 h-[290px] bg-white z-2"
      >
        <q-spinner-ios color="accent" size="2em" />
      </div>
      <div class="overflow-y-auto h-[285px] z-1">
        <message
          v-for="message in messages"
          :key="message.id"
          :mess="message"
          :room="room"
        />
      </div>
    </div>
    <input-chat
      v-model:content="contentMessage"
      v-model:files="images"
      :loading="loadingSendMessage"
      @sendMessage="sendMessage"
    />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  nextTick,
  watch,
} from "vue";
import { v4 as uuid } from "uuid";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import Avatar from "./Avatar.vue";
import InputChat from "./InputChat.vue";
import Message from "./Message.vue";
import { chatStore } from "../stores/chat-store";
import { MessageDataType, RoomDataType } from "@/ts/types";
import type { PropType } from "vue";
import { authStore } from "@/stores/auth-store";
import { PATH_AVATAR_DEAULT } from "@/utils/constant";
import { db } from "@/firebase";

export default defineComponent({
  name: "BoxChat",
  components: {
    Avatar,
    InputChat,
    Message,
  },
  props: {
    room: {
      type: Object as PropType<RoomDataType>,
      required: true,
    },
  },
  setup(props) {
    const chatStr = chatStore();
    const authStr = authStore();
    const room = computed(() => props.room);
    const idUser = computed(() => authStr.user?.id);

    const messages = ref<MessageDataType[]>([]);

    const idMessage = ref<string>("");

    const loadingMessage = ref(true);

    const loadingSendMessage = ref(false);

    const contentMessage = ref<string>();

    const images = ref<string[]>([]);

    const onMinimizeRoom = () => {
      chatStr.setSmallRooms(room.value);
    };

    /**
     * Closes a room.
     * @return {void}
     */
    const onCloseRoom = (): void => {
      chatStr.closeRoom(room.value.id);
    };

    /**
     * Send a message to the current room.
     * @return {Promise<void>}
     */
    const sendMessage = async (): Promise<void> => {
      if (contentMessage.value || images.value.length) {
        loadingSendMessage.value = true;
        const id = uuid();
        idMessage.value = id;
        await setDoc(doc(db, "messages", id), {
          images: images.value,
          content: contentMessage.value || "",
          senderId: idUser.value,
          roomId: room.value.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
          .then(async () => {
            await updateDoc(doc(db, "rooms", room.value.id), {
              latestMessage: contentMessage.value
                ? contentMessage.value
                : `Đã gửi ${images.value.length} ảnh`,
            });
            images.value = [];
            contentMessage.value = "";
          })
          .catch((err) => {
            console.log(err);
          });
        loadingSendMessage.value = false;
      }
    };

    watch(messages.value, () => {
      if (messages.value.length) {
        nextTick(() => {
          document.querySelector(".q-pa-md:last-child")?.scrollIntoView({
            behavior: "smooth",
          });
          loadingMessage.value = false;
        });
      }
    });

    onMounted(async () => {
      loadingMessage.value = true;
      const q = query(
        collection(db, "messages"),
        where("roomId", "==", room.value.id),
        orderBy("createdAt"),
      );
      const listMess: MessageDataType[] = [];
      const unSub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listMess.push(doc.data() as MessageDataType);
        });
        if (!messages.value.length) {
          messages.value = [...listMess];
        } else {
          messages.value.push(listMess[listMess.length - 1]);
        }
        nextTick(() => {
          document.querySelector(".q-pa-md:last-child")?.scrollIntoView();
          loadingMessage.value = false;
        });
      });
      return () => unSub();
    });

    return {
      onMinimizeRoom,
      onCloseRoom,
      room,
      idUser,
      PATH_AVATAR_DEAULT,
      messages,
      contentMessage,
      sendMessage,
      loadingMessage,
      images,
      loadingSendMessage,
    };
  },
});
</script>
