<template>
  <div
    class="sm:w-full md:w-[calc(100vw-300px)] lg:w-[calc(100vw-600px)] md:mr-auto lg:mx-auto bg-coolGray h-screen"
  >
    <create-post-form />
    <div class="post"></div>
  </div>
</template>
<script lang="ts">
import CreatePostForm from "@/components/CreatePostForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    CreatePostForm,
  },
  setup() {},
});
</script>
