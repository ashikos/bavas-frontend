import axios from "axios";
import {base_url} from './libs/consts/urls'

const instance = axios.create({
    baseURL:base_url
})


export default instance
