import axios from 'axios'
import config from '@/services/config'
import Cookies from 'js-cookie'

const logout = async () => {
  const rota = config.url + '/api/logout'
  const headers = {
    Authorization: 'Bearer ' + Cookies.get('token')
  }
  try {
    await axios.get(rota, {
      headers: headers
    })
    Cookies.remove('token')
    localStorage.removeItem('name')
    return true
  } catch (error) {
    return false
  }
}
export default logout
