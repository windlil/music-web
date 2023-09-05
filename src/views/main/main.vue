<script setup lang="ts">
import BaseFooter from '@/components/base-footer/base-footer.vue'
</script>

<template>
  <div class="main">
    <div class="content">
      <routerView />
    </div>
    <BaseFooter class="footer" />
  </div>
</template>

<style scoped lang="scss">
.main {
  position: relative;
  height: 100%;
  .content {
    height: 100%;
    overflow: auto;
  }

  .footer {
    position: absolute;
    bottom: 0;
  }

}
</style>
