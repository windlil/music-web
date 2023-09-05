import { defineStore } from 'pinia'
import { fetchPpersonalizeder, fetchNewSong } from '@/server/modules/home'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    personalized: '',
    newSongList: '',
  }),
  actions: {
    async getPpersonalizeder() {
      const res = await fetchPpersonalizeder<any>()
      this.personalized = res.result
    },
    async getNewSong() {
      const res = await fetchNewSong<any>()
      this.newSongList = res.result
    },
  },
})
