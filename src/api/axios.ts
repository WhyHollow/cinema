import axios from 'axios'

const api = axios.create({
  baseURL: 'https://cinema-api-test.y-media.io/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
