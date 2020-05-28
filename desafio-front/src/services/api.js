import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

api.interceptors.request.use((config)=>{

  return { ...config, auth: {
    username: "admin",
    password: "admin"
  }}
})

export default api;