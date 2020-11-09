import blogService from '../services/blogs.js';

export default (newBlog, token) => {
    return async dispatch => {
        const data = await blogService.addOne(newBlog, token);
        dispatch({
            type: 'ADD_BLOG',
            data
        });
    };
};