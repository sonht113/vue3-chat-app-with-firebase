<template>
  <div
    class="action-chat flex items-center justify-between px-2 w-full h-[60px] absolute bottom-0 border-t-1 border-t-solid border-t-gray-1 bg-white"
  >
    <div class="w-1/5">
      <label for="file">
        <font-awesome-icon
          :icon="['fas', 'image']"
          class="text-2xl cursor-pointer text-gray-6"
        />
      </label>
      <input id="file" type="file" class="hidden" accept="image/*" />
    </div>

    <div class="flex items-center">
      <q-input
        rounded
        outlined
        placeholder="Enter your message"
        :autogrow="true"
        :input-style="{ fontSize: '13px' }"
        class="input-chat"
      >
      </q-input>
      <q-btn round dense flat color="primary" icon="send" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.input-chat .q-field__control {
  min-height: 48px !important;
  height: 48px !important;
}

.q-textarea .q-field__native {
  min-height: 48px !important;
  height: 48px !important;
  padding-top: 15px;
  padding-left: 10px !important;
  padding-right: 10px !important;
}
</style>
