<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="header">
    <div class="header-left">
      <p class="greet">
        Good Monoring
      </p>
      <p class="username">
        windlil
      </p>
    </div>
    <div class="header-right">
      <Icon class="icon icon-search" icon="ri:search-2-line" />
      <Icon class="icon" icon="ci:bell" />
    </div>
  </div>
  <div class="border" />
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 15px 0;
  .header-left {
    .greet {
      font-size: 12px;
      color: #6c6c6c;
      margin-bottom: 4px;
    }

    .username {
      font-size: 18px;
    }
  }

  .header-right {
    display: flex;
    justify-content: space-between;
  }
}
.icon {
  font-size: 20px;
  color: #b0b0b0;
  margin: 0 5px;
}

.icon-search {
  margin-right: 10px;
}
</style>
