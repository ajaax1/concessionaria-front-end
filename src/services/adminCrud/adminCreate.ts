import axios from "axios";
import config from "@/services/config";
import type admin from "@/types/adminTypes/admin";
import Cookies from 'js-cookie';

const adminCreate = async (payload:admin) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        await axios.post(`${config.url}/api/admins`, payload,{
            headers: headers
        });
        return true;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default adminCreate;    
