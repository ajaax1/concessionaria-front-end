import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();

const adminShow = async(id) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        const response = await axios.get(`${config.url}/api/admins/${id}`,{
            headers: headers
        });
        return response.data;
    } catch (error) {
        return false;
    }
}
export default adminShow;    
