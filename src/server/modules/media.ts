import useRequest from '..'

export function fetchVideoList<T = any>() {
  return useRequest.get<T>({
    url: '/video/timeline/recommend',
  })
}
