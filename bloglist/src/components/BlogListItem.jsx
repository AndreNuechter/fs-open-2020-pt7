import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Blog = ({ blog }) => <li className="blog" data-id={blog.id} data-likes={blog.likes}>
    <Link to={`blogs/${blog.id}`}>"{blog.title}" by {blog.author || 'Anonymous'}</Link>
</li >;

Blog.propTypes = {
    blog: PropTypes.object.isRequired
};

export default Blog;