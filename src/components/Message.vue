<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 320px">
      <q-chat-message
        v-if="mess.images.length > 0"
        :name="
          mess.senderId === idOwner ? 'Me' : room.members[idOwner!]?.fullname
        "
        :avatar="room.members[mess.senderId]?.avatar || PATH_AVATAR_DEAULT"
        :stamp="timeUtils.getTimeSendMessage(mess.createdAt)"
        :sent="mess.senderId === idOwner"
        text-color="white"
        :bg-color="mess.senderId === idOwner ? 'primary' : 'amber-14'"
      >
        <div
          :class="`flex flex-wrap gap-1 ${mess.senderId === idOwner ? 'justify-end' : 'justify-start'}`"
        >
          <q-img
            v-for="image in mess.images"
            :key="image"
            :src="image"
            class="cursor-pointer w-[60px] h-[60px] object-cover"
            @click="handlePreviewImage(image)"
          ></q-img>
        </div>
      </q-chat-message>
      <q-chat-message
        v-if="mess.content"
        :name="
          mess.senderId === idOwner ? 'Me' : room.members[idOwner!]?.fullname
        "
        :avatar="room.members[mess.senderId]?.avatar || PATH_AVATAR_DEAULT"
        :stamp="timeUtils.getTimeSendMessage(mess.createdAt)"
        :sent="mess.senderId === idOwner"
        text-color="white"
        :bg-color="mess.senderId === idOwner ? 'primary' : 'amber-14'"
      >
        <div
          :class="`flex flex-wrap gap-1 ${mess.senderId === idOwner ? 'justify-end' : 'justify-start'}`"
        >
          {{ mess.content }}
        </div>
      </q-chat-message>
    </div>
  </div>
  <q-dialog
    v-model="showImagePreview.visible"
    backdrop-filter="blur(4px) saturate(150%)"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section>
        <q-img
          :src="showImagePreview.url"
          class="object-cover w-[450px]"
        ></q-img
      ></q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { authStore } from "@/stores/auth-store";
import { MessageDataType, RoomDataType } from "@/ts/types";
import { computed, defineComponent, PropType, ref } from "vue";
import { PATH_AVATAR_DEAULT } from "@/utils/constant";
import { timeUtils } from "@/utils/time";

export default defineComponent({
  name: "Message",
  props: {
    mess: {
      type: Object as PropType<MessageDataType>,
      required: true,
    },
    room: {
      type: Object as PropType<RoomDataType>,
      required: true,
    },
  },
  setup() {
    const authStr = authStore();
    const idOwner = computed(() => authStr.user?.id);

    const showImagePreview = ref<{
      visible: boolean;
      url: string;
    }>({
      visible: false,
      url: "",
    });

    const handlePreviewImage = (url: string) => {
      showImagePreview.value = {
        visible: true,
        url,
      };
    };

    return {
      idOwner,
      PATH_AVATAR_DEAULT,
      showImagePreview,
      handlePreviewImage,
      timeUtils,
    };
  },
});
</script>
<style scoped></style>
