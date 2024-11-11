import request from '@/utils/request'

export const getFileList = () => {
  const requestURL = '/ecology/data'
  try {
    const res = request.get(requestURL)
    return res
  } catch (err) {
  }
}

export const submitFile = (file) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data;'
    }
  }
  const data = {
    fileName: file.name,
    file: file
  }
  try {
    return request.post('/ecology/data/file', data, config)
  } catch (err) {
  }
}

export const delFile = (fileName) => {
  const requestURL = '/ecology/data/file'
  try {
    const res = request.get(requestURL, {
      params: {
        delFile: fileName
      }
    })
    return res
  } catch (err) {
  }
}
