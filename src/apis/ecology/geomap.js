import request from '@/utils/request'

export const getMap = () => {
  const requestURL = '/ecology/geomap'
  try {
    const res = request.get(requestURL)
    return res
  } catch (err) {
  }
}
