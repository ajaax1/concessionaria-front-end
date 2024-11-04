import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';

const veiculoCreate = async (payload, imagens) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token'),
        'Content-Type': 'multipart/form-data'
    };

    const formData = new FormData();
    for (const key in payload) {
        if (key === 'opcionaisVeiculo' && Array.isArray(payload[key])) {
            formData.append(key, JSON.stringify(payload[key]));
        } else {
            formData.append(key, payload[key]);
        }
    }

    imagens.forEach((imagem, index) => {
        formData.append(`imagens[${index}]`, imagem);
    });

    try {
        await axios.post(`${config.url}/api/veiculos`, formData, {
            headers: headers
        });
        return true;
    } catch (error) {
        return error.response?.data?.errors || error.message;
    }
};

export default veiculoCreate;
