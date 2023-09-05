<script setup lang="ts">
import baseFooter from './components/base-footer/base-footer.vue'
</script>

<template>
  <div class="app">
    <baseFooter class="footer" />
  </div>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  background-color: #0e0e0e;
  position: relative;

  .footer {
    position: absolute;
    bottom: 0;
  }
}
</style>
