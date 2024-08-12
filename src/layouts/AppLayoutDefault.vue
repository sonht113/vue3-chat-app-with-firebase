<template>
  <Header />
  <div class="mt-[100px]">
    <slot />
  </div>
</template>
<script setup lang="ts">
import Header from "../components/header.vue";
</script>
