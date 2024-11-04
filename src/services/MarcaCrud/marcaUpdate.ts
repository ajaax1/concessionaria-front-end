import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';
import type admin from "@/types/adminTypes/admin";

const adminUpdate = async (payload:admin, id) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        await axios.put(`${config.url}/api/marcas/${id}`, payload,{
            headers: headers
        });
        return true;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default adminUpdate;    
