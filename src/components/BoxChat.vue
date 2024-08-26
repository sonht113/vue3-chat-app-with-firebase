<template>
  <div class="relative w-[320px] h-[400px] bg-white rounded-t-lg">
    <div
      class="flex items-center justify-between gap-2 border-b-1 border-b-solid border-b-gray-1"
    >
      <div
        class="flex items-center gap-2 p-2 hover:bg-gray-2 rounded-md cursor-pointer"
      >
        <avatar :size="35" url="https://cdn.quasar.dev/img/avatar4.jpg" />
        <div class="flex flex-col">
          <span class="font-bold text-gray-6 text-sm"
            >Ho Trong Son {{ idRoom }}</span
          >
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

export default defineComponent({
  name: "BoxChat",
  components: {
    Avatar,
    InputChat,
    Message,
  },
  props: {
    room: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const chatStr = chatStore();
    const idRoom = computed(() => props.room);

    const onMinimizeRoom = () => {
      chatStr.setSmallRooms(idRoom.value);
    };

    const onCloseRoom = () => {
      chatStr.closeRoom(idRoom.value);
    };

    return {
      onMinimizeRoom,
      onCloseRoom,
      idRoom,
    };
  },
});
</script>
