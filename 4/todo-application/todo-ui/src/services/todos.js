import axios from 'axios'
const baseUrl = '/todos'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
  
const addTodo = async (todo) => {
  const response = await axios.post(baseUrl, todo)
  return response.data
}

const updateTodo = async (id, todo) => {
  const response = await axios.put(`${baseUrl}/${id}`, todo)
  return response.data
}

export default { getAll, addTodo, updateTodo }