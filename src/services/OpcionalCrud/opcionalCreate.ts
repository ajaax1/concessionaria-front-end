import axios from "axios";
import config from "@/services/config";
import type opcional from "@/types/opcionalTypes/opcionais";
import Cookies from 'js-cookie';

const opcionalCreate = async (payload:opcional) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        await axios.post(`${config.url}/api/opcionais`, payload,{
            headers: headers
        });
        return true;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default opcionalCreate;    
