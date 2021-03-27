import axios from "axios";

const api = axios.create({
  baseURL: "https://api-metalhead.herokuapp.com"
})

export default api;