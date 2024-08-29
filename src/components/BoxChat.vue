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
    <message />
    <input-chat />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import Avatar from "./Avatar.vue";
import InputChat from "./InputChat.vue";
import Message from "./Message.vue";
import { chatStore } from "../stores/chat-store";
import { RoomDataType } from "@/ts/types";
import type { PropType } from "vue";
import { authStore } from "@/stores/auth-store";
import { PATH_AVATAR_DEAULT } from "@/utils/constant";

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

    const onMinimizeRoom = () => {
      chatStr.setSmallRooms(room.value);
    };

    const onCloseRoom = () => {
      chatStr.closeRoom(room.value.id);
    };

    return {
      onMinimizeRoom,
      onCloseRoom,
      room,
      idUser,
      PATH_AVATAR_DEAULT,
    };
  },
});
</script>
