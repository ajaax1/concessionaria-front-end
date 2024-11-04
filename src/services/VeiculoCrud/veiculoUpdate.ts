import axios from "axios";
import config from "@/services/config";
import Cookies from 'js-cookie';
import type admin from "@/types/adminTypes/admin";

const adminUpdate = async (payload: admin, id, imagens) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token'),
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT' 
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
        await axios.post(`${config.url}/api/veiculos/${id}`, formData, {
            headers: headers
        });
        return true;
    } catch (error) {
        return error.response?.data?.errors || error.message;
    }
};

export default adminUpdate;
