let timeoutId;

export default (data) => {
    return dispatch => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => dispatch({
            type: 'HIDE'
        }), 5000);

        dispatch({
            type: 'NOTIFY',
            data
        });
    };
};