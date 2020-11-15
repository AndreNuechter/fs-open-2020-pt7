import axios from 'axios';

const baseUrl = '/api/';

const logIn = credentials => axios
    .post(`${baseUrl}login`, credentials)
    .then(response => response.data);
const getAll = () => axios
    .get(`${baseUrl}users`)
    .then(response => response.data);

export default { logIn, getAll };