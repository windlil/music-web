<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useMainStore } from '@/store/modules/mian'

interface Item {
  iconName: string
  url: string
}

const router = useRouter()
const mainStore = useMainStore()
const { useCurrentIndex } = storeToRefs(mainStore)
const currentIndex = ref(useCurrentIndex.value)

const itemList = reactive<Item[]>([
  {
    iconName: 'solar:home-angle-outline',
    url: '/main/home',
  },
  {
    iconName: 'icon-park-outline:ranking',
    url: '/main/top',
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
  mainStore.setCurrentIndex(index)
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
        style="font-size: 28px; color: #616161;"
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
