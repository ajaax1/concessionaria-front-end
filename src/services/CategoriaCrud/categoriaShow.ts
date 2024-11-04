import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';

const categoriaShow = async(id) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        const response = await axios.get(`${config.url}/api/categorias/${id}`,{
            headers: headers
        });
        return response.data;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default categoriaShow;    
