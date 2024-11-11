import request from '@/utils/request'

export const getModelCard = () => {
  const requestURL = '/ecology/content'
  try {
    const res = request.get(requestURL)
    return res
  } catch (err) {
  }
}

export const saveModelCard = (modelList, oldName, newName) => {
  const requestURL = '/ecology/content'
  const data = { modelList: modelList }
  try {
    const res = request.post(requestURL, data, {
      params: {
        oldName: oldName,
        newName: newName
      }
    })
    return res
  } catch (err) {
  }
}

export const copyModelCard = (copyName) => {
  const requestURL = '/ecology/content'
  try {
    const res = request.get(requestURL, {
      params: {
        copyName: copyName
      }
    })
    return res
  } catch (err) {
  }
}
