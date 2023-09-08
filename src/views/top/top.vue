<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useTopStore } from '@/store/modules/top'
import Container from '@/components/container/container.vue'

const topStore = useTopStore()
const { topList } = storeToRefs(topStore)
const router = useRouter()

topStore.getTopList()

function toDetail(id: number) {
  router.push({
    path: '/detail-list',
    query: {
      id,
    },
  })
}

const loading = ref(false)

async function onRefresh() {
  setTimeout(() => {
    topStore.getTopList()
    loading.value = false
  }, 1000)
}
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="tip">
      上拉刷新
    </div>
    <div class="top">
      <Container v-if="topList" title="榜单推荐" p-b="80px">
        <div class="container">
          <div v-for="item in topList" :key="item.id" class="box" @click="toDetail(item.id)">
            <img :src="item.coverImgUrl" alt="">
            <Icon class="icon" icon="mingcute:play-fill" />
          </div>
        </div>
      </Container>
    </div>
  </van-pull-refresh>
</template>

<style scoped lang="scss">
.tip {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: #4f4f4f;
}

.top {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 15px;
  padding-top: 55px;

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .box {
      position: relative;
      width: 88px;
      height: 80px;
      margin-bottom: 15px;
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.icon {
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 15px;
}
</style>
