<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

interface Item {
  iconName: string
  url: string
}

const router = useRouter()
const currentIndex = ref(0)

const itemList = reactive<Item[]>([
  {
    iconName: 'solar:home-angle-outline',
    url: '/main/home',
  },
  {
    iconName: 'la:user',
    url: '/main/user',
  },
  {
    iconName: 'mi:play',
    url: '/main/media',
  },
])

function clickItem(item: Item, index: number) {
  router.push(item.url)
  currentIndex.value = index
}
</script>

<template>
  <div class="footer">
    <div
      v-for="(item, index) in itemList"
      :key="item.iconName" class="footer-item"
      @click="clickItem(item, index)"
    >
      <Icon
        style="font-size: 28px; color: #6d6d6d;"
        :class="{ actived: currentIndex === index }"
        :icon="item.iconName"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  z-index: 9;

  .footer-item {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-in-out;
  }
}

.actived {
  color: #c012b1 !important;
}
</style>
