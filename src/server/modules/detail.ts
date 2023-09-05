import useRequest from '..'

export function fetchMusicUrl<T>(id: number) {
  return useRequest.get<T>({
    url: '/song/url',
    params: {
      id,
    },
  })
}

export function fetchMusicDetail<T = any>(ids: number) {
  return useRequest.get<T>({
    url: '/song/detail',
    params: {
      ids,
    },
  })
}
