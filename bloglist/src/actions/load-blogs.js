import blogService from '../services/blogs.js';

export default () => {
    return async dispatch => {
        const data = await blogService.getAll();
        dispatch({
            type: 'LOAD_BLOGS',
            data
        });
    };
};