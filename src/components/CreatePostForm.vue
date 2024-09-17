<template>
  <div
    class="create-post w-4/5 lg:w-4/5 xl:w-2/3 h-[150px] bg-white mx-auto rounded-b-xl"
  >
    <div class="px-10 pt-4 flex flex-col gap-3">
      <span class="text-gray-500">Bạn đang nghĩ gì thế?</span>
      <div v-if="!loading" class="flex justify-between items-center">
        <div class="w-[40px]">
          <q-avatar size="40px" class="cursor-pointer">
            <img :src="userData?.avatar" />
          </q-avatar>
        </div>
        <div
          class="w-[calc(100%-50px)] h-10 bg-gray-4 flex justify-start items-center rounded-full cursor-pointer hover:bg-gray-2 ease-linear transition-duration-150 px-4 text-gray-2 hover:text-gray-5 gap-1"
          @click="() => (isShowFormCreateDialog = true)"
        >
          <span class="uppercase">{{ userData?.fullname + " " }}</span
          ><span> ơi, bạn đang nghĩ gì thế?</span>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="isShowFormCreateDialog"
      backdrop-filter="blur(4px) saturate(150%)"
      transition-show="slide-up"
      transition-hide="slide-down"
      :persistent="true"
    >
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-center">Close icon</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import { authStore } from "@/stores/auth-store";
import { globalStore } from "@/stores/global-store";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "CreatePostForm",
  setup() {
    const authStr = authStore();
    const globalStr = globalStore();
    const userData = computed(() => authStr.user);
    const loading = computed(() => globalStr.loading);

    const isShowFormCreateDialog = ref(false);

    return {
      userData,
      loading,
      isShowFormCreateDialog,
    };
  },
});
</script>
