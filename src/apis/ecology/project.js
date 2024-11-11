import request from '@/utils/request'

export const getProjectList = () => {
  const requestURL = '/ecology/project'
  try {
    const res = request.get(requestURL)
    return res
  } catch (err) {
  }
}

export const saveProjectList = (projectList, database) => {
  const requestURL = '/ecology/project'
  const data = { projectList: projectList }
  try {
    const res = request.post(requestURL, data, {
      params: {
        database: database
      }
    })
    return res
  } catch (err) {
  }
}
