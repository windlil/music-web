<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { fetchPlayList } from '@/server/modules/detail'
import PlayList from '@/components/music-list/play-list.vue'
import useMusicStore from '@/store/modules/music'

const route = useRoute()
const router = useRouter()
const id = ref(route.query.id) as any
const playList = ref()
const tracks = ref()
const musicStore = useMusicStore()

function back() {
  router.back()
}

async function getPlayList() {
  const data = await fetchPlayList(id.value)
  playList.value = data.playlist
  tracks.value = playList.value.tracks
  for (let i = 0; i < tracks.value.length; i++) {
    tracks.value[i].id = playList.value.trackIds[i].id
  }
  musicStore.setPlayList(tracks.value as any)
}
getPlayList()
</script>

<template>
  <div v-if="playList" class="detail-list">
    <div class="back-icon" @click="back">
      <Icon icon="ic:baseline-arrow-back-ios" />
    </div>
    <div class="info">
      <div class="img">
        <img :src="playList.coverImgUrl" alt="">
      </div>
      <div class="detail">
        <p class="list-name">
          {{ playList.name }}
        </p>
        <p class="list-creator">
          <span class="creator-avator">
            <img :src="playList.creator.avatarUrl" alt="">
          </span>
          <span class="creator-name">
            {{ playList.creator.nickname }}
          </span>
        </p>
      </div>
    </div>
    <div class="music-list">
      <PlayList :music-list="tracks" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.detail-list {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  background-color: #1d1d1d;

  .back-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 25px;
    color: #656565;
  }

  .info {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 110px;
    padding: 10px;
    padding-top: 15px;
    margin-top: 30px;
    background-color: #2a2a2a;

    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;

      .list-name {
        max-height: 38px;
        margin-bottom: 8px;
      }

      .list-creator {
        display: flex;
        align-items: center;
        font-size: 12px;

        .creator-avator {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 5px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .creator-name {
          color: #c2c2c2;
        }
      }
    }

    .img {
      width: 100px;
      height: 80px;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
