import useRequest from '..'

export function fetchAllTopList<T = any>() {
  return useRequest.get<T>({
    url: '/toplist',
  })
}
