import axios from "axios";
import {local_url} from "./constants/constants"


const instance = axios.create({
    baseURL: local_url
})

export default instance