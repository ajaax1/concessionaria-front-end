import axios from "axios";
import config from "@/services/config";
import type categoria from "@/types/categoriaTypes/categoria";
import Cookies from 'js-cookie';

const categoriaCreate = async (payload:categoria) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        await axios.post(`${config.url}/api/categorias`, payload,{
            headers: headers
        });
        return true;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default categoriaCreate;    
