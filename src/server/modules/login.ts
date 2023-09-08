import useRequest from '..'

export function fetchLoginStatus<T = any>() {
  return useRequest.get<T>({
    url: '/login/status',
  })
}
