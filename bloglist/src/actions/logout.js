export default () => {
    return dispatch => {
        window.localStorage.removeItem('user');
        dispatch({
            type: 'LOGOUT'
        });
    };
};