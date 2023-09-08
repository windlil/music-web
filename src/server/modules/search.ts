import useRequest from '..'

export function search<T = any>(keywords: string) {
  return useRequest.get<T>({
    url: '/search',
    params: {
      keywords,
    },
  })
}
