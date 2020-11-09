import blogService from '../services/blogs.js';

export default (id, token) => {
    return async dispatch => {
        await blogService.deleteBlog(id, token);
        dispatch({
            type: 'DELETE_BLOG',
            data: id
        });
    };
};