import axios from 'axios';

const apiBanco = axios.create({
    baseURL: "http://localhost:3001"
});

const apiConvert = axios.create({
    baseURL: ""
});

export {
    apiBanco,
    apiConvert
}
