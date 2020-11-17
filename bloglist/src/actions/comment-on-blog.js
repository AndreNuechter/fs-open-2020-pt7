import blogService from '../services/blogs.js';

export default (id, content) => {
    return async dispatch => {
        const data = await blogService.comment(id, content);
        dispatch({
            type: 'COMMENT_ON_BLOG',
            data: { comment: data, blogId: id }
        });
    };
};