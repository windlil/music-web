<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import useMusicStore from '@/store/modules/music'
import { fetchMusicUrl, fetchMusicDetail } from '@/server/modules/detail'
import { getCompleteName } from '@/utils'

const emits = defineEmits(['playMusic'])

const musicStore = useMusicStore()
const { currentPlayMusic } = storeToRefs(musicStore)
const route = useRoute()
const router = useRouter()
const musicData = ref()
const musicDetail = ref()
const songs = ref()
const url = ref()

const audioPlayStatus = ref((currentPlayMusic.value as any) === route.query.id)

async function getMusicUrlAndDetail(id: any) {
  musicData.value = await fetchMusicUrl<any>(id)
  musicDetail.value = await fetchMusicDetail(id)
  songs.value = musicDetail.value.songs[0]
  url.value = musicData.value.data[0].url
}

function back() {
  router.back()
}

function play() {
  musicStore.setCurrentPlayMusic(route.query.id as any)
  audioPlayStatus.value = !audioPlayStatus.value
  emits('playMusic', {
    url: url.value,
    status: audioPlayStatus.value,
  })
}

const playIcon = computed(() => {
  return audioPlayStatus.value ? 'heroicons-outline:pause' : 'material-symbols:play-circle-outline'
})

onMounted(() => {
  getMusicUrlAndDetail(route.query.id)
})
</script>

<template>
  <div v-if="songs && url" class="detail">
    <div class="back" @click="back">
      <Icon icon="ic:baseline-arrow-back-ios" />
    </div>
    <div class="pic">
      <img :src="songs?.al?.picUrl" alt="">
    </div>
    <div class="info">
      <p>
        {{ songs.al.name }}
      </p>
      <p class="artists">
        {{ getCompleteName(songs.ar) }}
      </p>
    </div>
    <div class="control">
      <Icon class="icon" icon="ic:baseline-skip-previous" />
      <Icon class="icon" :icon="playIcon" @click="play" />
      <Icon class="icon" icon="ic:baseline-skip-next" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.detail {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1d1d1d;

  .back {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 25px;
    color: #656565;
  }

  .pic {
    width: 200px;
    height: 200px;
    border-radius: 15px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .artists {
      margin-top: 5px;
      font-size: 12px;
      color: #949494;
    }
  }

  .control {
    margin-top: 50px;
  }
}

audio {
  display: none;
}

.icon {
  font-size: 35px;
  color: #9b9b9b;
  margin: 10px 20px;
}
</style>
