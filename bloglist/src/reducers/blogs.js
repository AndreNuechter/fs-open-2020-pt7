export default (state = [], { type, data }) => {
    switch (type) {
        case 'LOAD_BLOGS':
            return data;
        case 'ADD_BLOG':
            return [...state, data];
        case 'LIKE_BLOG':
            state.find(b => b.id === data).likes += 1;
            return state;
        case 'COMMENT_ON_BLOG':
            return state.map(b => {
                if (b.id === data.blogId) b.comments.push(data.comment);
                return b;
            });
        case 'DELETE_BLOG':
            return state.filter(b => b.id !== data);
        default:
            return state;
    }
};
export { default as load } from '../actions/load-blogs.js';
export { default as add } from '../actions/add-blog.js';
export { default as like } from '../actions/like-blog.js';
export { default as del } from '../actions/delete-blog.js';
export { default as comment } from '../actions/comment-on-blog.js';