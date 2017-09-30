import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:10001'

export const getFiles = (fileName) => {
  return axios.get(`/list?fileName=` + fileName, {})
}
