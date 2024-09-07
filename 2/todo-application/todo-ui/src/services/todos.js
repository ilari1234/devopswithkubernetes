import axios from 'axios'
const baseUrl = '/todos'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const addTodo = async (todo) => {
    const response = await axios.post(baseUrl, todo)
    return response.data
  }

export default { getAll, addTodo }