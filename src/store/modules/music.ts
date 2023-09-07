import { defineStore } from 'pinia'

const musicStore = defineStore('musicStore', {
  state: () => ({
    currentPlayMusicId: 0,
    currentPlayMusicData: {
      name: '',
      status: false,
      currentTime: 0,
    },
    enterMusicId: 0,
    enterplayList: [''],
    currentPlayList: [''],
  }),
  actions: {
    setCurrentPlayMusic(id: number) {
      this.currentPlayMusicId = id
    },
    setcurrentPlayMusicData(data: any) {
      const { name } = data
      this.currentPlayMusicData.name = name
    },
    setPlayStatus(sta: boolean) {
      this.currentPlayMusicData.status = sta
    },
    setCurrentTime(time: number) {
      this.currentPlayMusicData.currentTime = time
    },
    setEnterMusicId(id: number) {
      this.enterMusicId = id
    },
    setEnterPlayList(arr: any[]) {
      this.enterplayList = arr
    },
    setPlayList(arr: any[]) {
      this.currentPlayList = arr
    },
  },
})

export default musicStore
