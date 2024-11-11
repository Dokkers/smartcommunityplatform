import request from '@/utils/request'

export const getModels = () => {
  const requestURL = '/ecology/model'
  try {
    const res = request.get(requestURL)
    return res
  } catch (err) {
  }
}

export const getCells = (modelName) => {
  const requestURL = '/ecology/model'
  try {
    const res = request.get(requestURL, {
      params: {
        modelName: modelName
      }
    })
    return res
  } catch (err) {
  }
}

export const getFiles = () => {
  const requestURL = '/ecology/files'
  try {
    const res = request.get(requestURL)
    return res
  } catch (err) {
  }
}

export const getPreviewData = (fileName) => {
  const requestURL = '/ecology/files'
  try {
    const res = request.get(requestURL, {
      params: {
        fileName: fileName
      }
    })
    return res
  } catch (err) {
  }
}
export const loadingData = (label, fileName, keys, mappingData, database) => {
  const config = {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
      label: label,
      fileName: fileName,
      database: database
    }
  }
  const data = {
    mappingData: mappingData,
    stKeys: keys
  }
  try {
    return request.post('/ecology/model', data, config)
  } catch (err) {
  }
}
