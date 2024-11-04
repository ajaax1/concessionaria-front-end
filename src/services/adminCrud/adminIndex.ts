import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';

const rota = config.url + "/api/admins"
let response;
const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + Cookies.get('token')
}

const adminIndex = async () => {
    try {
        response = await axios.get(rota,{
            headers: headers
        });
        return response.data;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default adminIndex;    
