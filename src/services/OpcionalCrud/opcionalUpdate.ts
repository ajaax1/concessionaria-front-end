import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';
import type opcional from "@/types/opcionalTypes/opcional";

const opcionalUpdate = async (payload:opcional, id) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        await axios.put(`${config.url}/api/opcionais/${id}`, payload,{
            headers: headers
        });
        return true;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default opcionalUpdate;    
