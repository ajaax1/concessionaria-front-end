import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';

const adminPesquisar = async (pesquisa:string) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }
    try {
        response = await axios.get(`${config.url}/api/pesquisar-admin/${pesquisa}`,{
            headers: headers
        });
        return response.data;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default adminPesquisar;    
