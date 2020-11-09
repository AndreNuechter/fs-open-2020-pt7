import userService from '../services/users.js';

export default (credentials) => {
    return async dispatch => {
        const data = await userService.logIn(credentials);
        window.localStorage.setItem('user', JSON.stringify(data));
        dispatch({
            type: 'LOGIN',
            data
        });
    };
};