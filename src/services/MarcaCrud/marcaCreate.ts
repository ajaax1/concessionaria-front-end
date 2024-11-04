import axios from "axios";
import config from "@/services/config";
import type marca from "@/types/marcaTypes/marca";
import Cookies from 'js-cookie';

const marcaCreate = async (payload:marca) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        await axios.post(`${config.url}/api/marcas`, payload,{
            headers: headers
        });
        return true;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default marcaCreate;    
