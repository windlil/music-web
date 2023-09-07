<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { getCompleteName } from '@/utils/index'
import useMusicStore from '@/store/modules/music'

const props = defineProps<{
  musicList: any
}>()

const musicStore = useMusicStore()
const router = useRouter()

function toDetail(id: number) {
  musicStore.setPlayList(props.musicList)

  router.push({
    path: '/detail-song',
    query: {
      id,
    },
  })
}
</script>

<template>
  <div v-if="musicList" class="music-list">
    <ul>
      <li v-for="item in musicList" :key="item.id" class="list-item" @click="toDetail(item.id)">
        <span class="music-img">
          <img :src="item.picUrl" alt="">
        </span>
        <span class="info">
          <p class="name">
            {{ item.name }}
          </p>
          <p class="artist">
            {{ getCompleteName(item.song.artists) }}
          </p>
        </span>
        <div class="icon">
          <Icon icon="solar:play-circle-broken" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.music-list {
  width: 100%;
  ul {
    display: flex;
    width: 100%;
    flex-direction: column;

    .list-item {
      width: 100%;
      position: relative;
      display: flex;
      height: 50px;
      margin: 5px 0;
      padding: 2px 0;
      border-bottom: 1px solid #2d2d2d;

      .icon {
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
        color: #4e4e4e;
      }

      .music-img {
        width: 50px;
        height: 50px;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5px;
        font-size: 12px;

        .name {
          width: 200px;
          height: 18px;
          overflow: hidden;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .artist {
          width: 200px;
          height: 20px;
          overflow: hidden;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color:#777777;
        }
      }
    }
  }
}
</style>
