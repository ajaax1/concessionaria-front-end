import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';

const categoriaDelete = async (id) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        await axios.delete(`${config.url}/api/categorias/${id}`,{
            headers: headers
        });
        return true;
    } catch (error) {
        return error.response.data;
    }
}
export default categoriaDelete;    
