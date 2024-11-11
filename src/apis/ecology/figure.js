import request from '@/utils/request'

export const getFigure = () => {
  const requestURL = '/ecology/figure'
  try {
    const res = request.get(requestURL)
    return res
  } catch (err) {
  }
}

export const getItem = (type, label) => {
  const requestURL = '/ecology/figure/item'
  try {
    const res = request.get(requestURL, {
      params: {
        type: type,
        label: label
      }
    })
    return res
  } catch (err) {
  }
}

export const graphQuery = (cypher) => {
  const requestURL = '/ecology/figure/query'
  try {
    const res = request.get(requestURL, {
      params: {
        cypher: cypher
      }
    })
    return res
  } catch (err) {
  }
}
