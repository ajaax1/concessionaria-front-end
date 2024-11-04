import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';

const opcionalPesquisar = async (pesquisa:string) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
    }    
    try {
        const response = await axios.get(`${config.url}/api/pesquisar-opcionais/${pesquisa}`,{
            headers: headers
        });
        return response.data;
    } catch (error) {
        return error.response.data.errors;
    }
}
export default opcionalPesquisar;    
