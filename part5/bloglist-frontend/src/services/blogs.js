import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (newObject) => {
  return axios.put(`${baseUrl}/${newObject.id}`, newObject).then(res => res.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config).then(res => res.data)
}
// eslint-disable-next-line
export default { getAll, setToken, create, update, remove }