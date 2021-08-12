import axios from 'axios'
import store from '../redux/store'

const instance = axios.create({
  baseURL:"http://localhost:5000"
})

instance.interceptors.request.use(config => {
    store.dispatch({
      type:'change_loading',
      payload:true
    })
    return config
},error => {
  store.dispatch({
    type:'change_loading',
    payload:true
  })
})

instance.interceptors.response.use(res => {
  store.dispatch({
    type:'change_loading',
    payload:false
  })
    return res.data
},error => {
  store.dispatch({
    type:'change_loading',
    payload:false
  })
})

export default instance