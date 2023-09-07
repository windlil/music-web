import { defineStore } from 'pinia'
import { fetchAllTopList } from '@/server/modules/top'

export const useTopStore = defineStore('topStore', {
  state: () => ({
    topList: [] as any,
  }),
  actions: {
    async getTopList() {
      const data = await fetchAllTopList()
      this.topList = data.list
      this.topList = randomTop(this.topList)
      console.log(this.topList)
    },
  },
})

function randomTop(topList: any[]) {
  const result: any[] = []
  const randomArr: number[] = []
  while (result.length < 12) {
    const random = Math.floor(Math.random() * (topList.length - 1))
    if (!randomArr.includes(topList[random])) {
      result.push(topList[random])
    }
  }
  return result
}
