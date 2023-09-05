import useRequest from '..'

export function fetchPpersonalizeder<T>() {
  return useRequest.get<T>({
    url: '/personalized',
    params: {
      limit: 6,
    },
  })
}

export function fetchNewSong<T>() {
  return useRequest.get<T>({
    url: '/personalized/newsong',
  })
}
