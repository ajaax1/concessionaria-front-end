import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';

const marcaShow = async(id) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        const response = await axios.get(`${config.url}/api/marcas/${id}`,{
            headers: headers
        });
        return response.data;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default marcaShow;    
