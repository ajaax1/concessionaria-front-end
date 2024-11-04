import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';

const verifyAuth = async ():Promise<boolean> => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try{
        await axios.get(`${config.url}/api/verify-token`,{ headers: headers });
        return true;
    }catch(error){
        return false;
    }
}
export default verifyAuth;    
