import React from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';

const BlogsList = ({ user, blogs, likeBlog, deleteBlog }) => <>
    <h2>Blogs</h2>
    <ul className="blogs-list">
        {blogs.slice().sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
        )}
    </ul>
</>;

BlogsList.propTypes = {
    user: PropTypes.object.isRequired,
    blogs: PropTypes.array.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
};

export default BlogsList;