import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Blog from './BlogListItem';

const BlogsList = ({ user, likeBlog, deleteBlog }) => {
    const blogs = useSelector(({ blogs }) => blogs);

    return <ul className="blogs-list">
        {blogs.slice().sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
        )}
    </ul>;
};

BlogsList.propTypes = {
    user: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
};

export default BlogsList;