import axios from 'axios'
import config from '@/services/config'
import Cookies from 'js-cookie'

const refresh = async () => {
  const rota = config.url + '/api/refresh-token'
  let response
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + Cookies.get('token')
}
  try {
    response = await axios.get(rota, {
      headers: headers
    })
    Cookies.set('token', response.data.access_token)
    return true
  } catch (error) {
    return false
  }
}
export default refresh
