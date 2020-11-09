export default (state = {}, { type, data }) => {
    switch (type) {
        case 'LOGOUT':
            return null;
        case 'LOGIN':
            return data;
        case 'INIT':
            return data;
        default:
            return state;
    }
};
export { default as init } from '../actions/init.js';
export { default as login } from '../actions/login.js';
export { default as logout } from '../actions/logout.js';