import userService from '../services/users.js';

export default () => {
    return async dispatch => {
        const data = await userService.getAll();
        dispatch({
            type: 'LOAD_USERS',
            data
        });
    };
};