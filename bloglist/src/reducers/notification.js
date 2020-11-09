export default (state = '', { type, data }) => {
    switch (type) {
        case 'NOTIFY':
            return data;
        case 'HIDE':
            return '';
        default:
            return state;
    }
};
export { default as notify } from '../actions/notify.js';