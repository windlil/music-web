export function getPlayListPreAndNext(playList: any[], currentId: number) {
  console.log(playList)
  const result = {
    pre: '',
    next: '',
  }
  const length = playList.length
  let currentIndex
  playList.forEach((value: any, index: number) => {
    if (value.id === currentId) {
      currentIndex = index
    }
  })
  if (currentIndex === 0) {
    result.next = playList[1]
    result.pre = playList[length - 1]
  } else if (currentIndex === length - 1) {
    result.next = playList[0]
    result.pre = playList[currentIndex - 1]
  } else {
    result.next = playList[(currentIndex as any) + 1]
    result.pre = playList[(currentIndex as any) - 1]
  }
  return result
}
