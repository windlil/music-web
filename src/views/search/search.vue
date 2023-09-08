<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { search } from '@/server/modules/search'
import MusicList from '@/components/music-list/music-list.vue'

const value = ref('')
const musicList = ref()
const router = useRouter()

let timeout: any
function update() {
  clearTimeout(timeout)
  if (value.value.length === 0) {
    musicList.value = null
    return
  }
  timeout = setTimeout(async () => {
    const data = await search(value.value)
    musicList.value = data.result.songs
  }, 500)
}

function back() {
  router.back()
}
</script>

<template>
  <div class="search">
    <div class="search-box">
      <Icon class="icon" icon="ic:baseline-arrow-back-ios" @click="back" />
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" background="transparent" @update:model-value="update" />
    </div>
    <div v-if="musicList" class="musiclist">
      <MusicList :music-list="musicList" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.search {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-top: 20px;

  .search-box {
    display: flex;
    align-items: center;

    .van-search {
      flex: 1;
    }
  }
}

:depp(.van-search) {
  background-color: #ca3535 !important;
}

.icon {
  font-size: 30px;
  color: #6a6a6a;
  margin-left: 10px;
}
</style>
