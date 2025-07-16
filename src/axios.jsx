import axios from "axios";
import {base_url} from './libs/consts/urls'


const instance = axios.create({
    baseURL:base_url
})


instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken"); 
        if (token) {
            console.log(token);
            
            config.headers.Bearer = `${token}`;
        }else{
            window.location.href = '/login/';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



const loginInstance = axios.create({
    baseURL:base_url
})




export default {instance, loginInstance}

