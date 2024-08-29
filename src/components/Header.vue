<template>
  <div
    class="h-[70px] w-full fixed top-0 left-0 bg-gray-7 flex items-center justify-between px-8 z-12"
  >
    <router-link to="/home">
      <q-icon name="chat" size="30px" color="white" class="cursor-pointer" />
    </router-link>
    <div class="flex items-center gap-8">
      <font-awesome-icon
        :icon="['fas', 'bell']"
        class="text-white text-2xl cursor-pointer"
      />
      <q-btn class="w-[40px] h-[40px] rounded-full">
        <font-awesome-icon
          :icon="['fas', 'message']"
          class="text-white text-xl cursor-pointer"
        />
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list style="width: 300px">
            <sidebar-chat height="400px" :show-latest-message="true" />
          </q-list>
        </q-menu>
      </q-btn>
      <div>
        <q-avatar v-if="userData" size="40px" class="cursor-pointer">
          <img
            :src="userData.avatar || 'https://cdn.quasar.dev/img/avatar4.jpg'"
          />
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>Profile</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup>
                    <q-item-section>Recent tabs</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>History</q-item-section>
                  </q-item>
                </q-list>
              </div>
              <q-separator vertical inset class="q-mx-md" />
              <div class="column items-center">
                <q-avatar size="72px">
                  <img
                    :src="
                      userData.avatar ||
                      'https://cdn.quasar.dev/img/avatar4.jpg'
                    "
                  />
                </q-avatar>
                <div class="text-subtitle1 q-mt-md q-mb-xs uppercase">
                  {{ userData.fullname }}
                </div>
                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  :loading="loading"
                  @click="logout"
                />
              </div>
            </div>
          </q-menu>
        </q-avatar>
        <q-skeleton v-else size="40px" type="circle" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { doc, updateDoc } from "firebase/firestore";
import { pathRouter } from "@/constants/path";
import sessionStorageUtils from "@/utils/storage";
import { useRouter } from "vue-router";
import { db } from "@/firebase";
import { authStore } from "@/stores/auth-store";
import { toast } from "vue3-toastify";
import { computed, ref } from "vue";
import { UserDataType } from "@/ts/types";
import { chatStore } from "@/stores/chat-store";
import SidebarChat from "./SidebarChat.vue";

const router = useRouter();

const authStr = authStore();
const chatStr = chatStore();

const loading = ref(false);

const userData = computed<UserDataType | null>(() => authStr.user);

/**
 * Logs out the user by updating the user's connection status to false in the database,
 * clearing the storage, and redirecting to the login page.
 *
 * @return {Promise<void>} A promise that resolves when the user is logged out successfully,
 * or rejects with an error message if the logout process fails.
 */
const logout = async (): Promise<void> => {
  loading.value = true;
  await updateDoc(doc(db, "users", authStr.user?.id!), {
    isConnected: false,
  })
    .then(() => {
      chatStr.clearAllRoomsChat();
      authStr.setUser(null);
      sessionStorageUtils.clear();
      router.push(pathRouter.login);
      loading.value = false;
    })
    .catch(() => {
      toast.error("Logout failed");
      loading.value = false;
    });
};
</script>
