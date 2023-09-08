import { defineStore } from 'pinia'
import { fetchVideoList } from '@/server/modules/media'

export const useMediaStore = defineStore('mediaStore', {
  state: () => ({
    mediaList: '' as any,
  }),
  actions: {
    async getVideoList() {
      const data = await fetchVideoList()
      this.mediaList = data.datas
      console.log(this.mediaList)
    },
  },
})
