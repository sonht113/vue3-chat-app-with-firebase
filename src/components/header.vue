<template>
  <div
    class="h-[70px] w-full fixed top-0 left-0 bg-gray-7 flex items-center justify-between px-8"
  >
    <router-link to="/home">
      <q-icon name="chat" size="30px" color="white" class="cursor-pointer" />
    </router-link>
    <q-avatar size="50px" class="cursor-pointer">
      <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
      <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">Settings</div>
            <q-list dense padding>
              <q-item clickable v-ripple>
                <q-item-section> Change infor </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section> Item </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section> Item </q-item-section>
              </q-item>
            </q-list>
          </div>
          <q-separator vertical inset class="q-mx-lg" />
          <div class="column items-center">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>
            <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>
            <q-btn
              color="primary"
              label="Logout"
              push
              size="sm"
              v-close-popup
              @click="logout"
            />
          </div>
        </div>
      </q-menu>
    </q-avatar>
  </div>
</template>
<script setup lang="ts">
import { pathRouter } from "../constants/path";
import { clearStorage } from "../utils/storage";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  clearStorage();
  router.push(pathRouter.login);
};
</script>
