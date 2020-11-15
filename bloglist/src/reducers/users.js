export default (state = [], { type, data }) => {
    switch (type) {
        case 'LOAD_USERS':
            return data;
        default:
            return state;
    }
};
export { default as loadUserList } from '../actions/load-user-list.js';