import axios from 'axios';

const baseUrl = '/api/login';

const logIn = credentials => axios
    .post(baseUrl, credentials)
    .then(response => response.data);

export default { logIn };