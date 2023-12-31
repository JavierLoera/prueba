import axios from "axios"

const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + '/api/v1/abilities',

    headers: {
        'Content-Type': 'application/json',
    }
})

export default API