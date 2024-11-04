import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';
let response;

const opcionalIndex = async () => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        response = await axios.get(`${config.url}/api/opcionais`,{
            headers: headers
        });
        return response.data;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default opcionalIndex;    
