export default () => {
    return dispatch => {
        const data = JSON.parse(window.localStorage.getItem('user'));
        dispatch({
            type: 'INIT',
            data
        });
    };
};