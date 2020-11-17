import React from 'react';
import PropTypes from 'prop-types';
import BlogsList from './BlogsList';
import BlogCreationForm from './BlogCreationForm';
import Togglable from './Togglable';

const BlogArea = (({ getRef, user, addBlog, likeBlog, deleteBlog }) => {
    return <>
        <h2>Blogs</h2>
        <Togglable labelOpen="Create Blog" ref={getRef()}>
            <BlogCreationForm token={user.token} addBlog={addBlog} />
        </Togglable>
        <BlogsList likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
    </>;
});

BlogArea.propTypes = {
    user: PropTypes.object.isRequired,
    addBlog: PropTypes.func.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    getRef: PropTypes.func.isRequired
};

export default BlogArea;
