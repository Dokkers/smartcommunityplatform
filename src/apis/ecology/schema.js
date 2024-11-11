import request from '@/utils/request'

export const saveSchema = (name, data) => {
  const requestURL = '/ecology/schema'
  try {
    const res = request.post(requestURL, data, {
      params: {
        name: name
      }
    })
    return res
  } catch (err) {
  }
}

export const getSchema = (name) => {
  const requestURL = '/ecology/schema'
  try {
    const res = request.get(requestURL, {
      params: {
        name: name
      }
    })
    return res
  } catch (err) {
  }
}
