import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';

let response;
const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + Cookies.get('token')
}

const habilidadeIndex = async () => {
    try {
        response = await axios.get(`${config.url}/api/habilidades`,{
            headers: headers
        });
        return response.data;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default habilidadeIndex;    
