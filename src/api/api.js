import axios from 'axios'
axios.defaults.baseURL = 'http://ocean.evertechs.cn'

export const getFiles = (fileName) => {
  return axios.get(`/list?fileName=` + fileName, {})
}

export const getSatastic = () => {
  return axios.get(`/getSatastic`, {})
}
