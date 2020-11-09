import blogService from '../services/blogs.js';

export default (id) => {
    return async dispatch => {
        await blogService.like(id);
        dispatch({
            type: 'LIKE_BLOG',
            data: id
        });
    };
};