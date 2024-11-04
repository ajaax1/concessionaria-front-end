import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';
import type categoria from "@/types/categoriaTypes/categoria";

const categoriaUpdate = async (payload:categoria, id) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        await axios.put(`${config.url}/api/categorias/${id}`, payload,{
            headers: headers
        });
        return true;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default categoriaUpdate;    
