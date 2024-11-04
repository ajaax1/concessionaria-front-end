import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';
import type adminAuth from "@/types/adminTypes/admin";

const rota = config.url + "/api/admin/login"
let response;

const auth = async (payload:adminAuth) => {
    try {
        response = await axios.post(rota, payload);
        Cookies.set('token', response.data.access_token);
        localStorage.setItem('name', response.data.name);
        return true;
    } catch (error) {
        return false;
    }
}
export default auth;    
