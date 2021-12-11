import axios from 'axios';

const apiBanco = axios.create({
    baseURL: "http://localhost:3001"
});

export {
    apiBanco
}
