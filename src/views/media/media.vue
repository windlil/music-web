<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import Container from '@/components/container/container.vue'
import { useMediaStore } from '@/store/modules/media'

const mediaStore = useMediaStore()
mediaStore.getVideoList()
const { mediaList } = storeToRefs(mediaStore)

const loading = ref(false)
async function onRefresh() {
  await mediaStore.getVideoList()
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="media">
      <Container title="视频推荐" p-b="100px">
        <template v-for="item in mediaList" :key="item.data.urlInfo.id">
          <div class="container-box">
            <video controls :src="item.data.urlInfo.url" />
            <div class="info">
              {{ item.data.title }}
            </div>
          </div>
        </template>
      </Container>
    </div>
  </van-pull-refresh>
</template>

<style scoped lang="scss">
video {
  width: 100%;
  height: 200px;
}

.media {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  padding-top: 50px;

  .container-box {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
