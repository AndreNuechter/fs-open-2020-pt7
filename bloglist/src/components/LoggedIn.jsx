import React from 'react';
import PropTypes from 'prop-types';
import BlogsList from './BlogsList';
import BlogCreationForm from './BlogCreationForm';
import Togglable from './Togglable';

const LoggedIn = ({ user, logOut, blogs, addBlog, likeBlog, deleteBlog, getRef }) => <div>
    Logged in as {user.username}
    <button onClick={logOut}>Log Out</button>
    <Togglable labelOpen="Create Blog" ref={getRef()}>
        <BlogCreationForm token={user.token} addBlog={addBlog} />
    </Togglable>
    <BlogsList blogs={blogs} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
</div>;

LoggedIn.propTypes = {
    user: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired,
    addBlog: PropTypes.func.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    getRef: PropTypes.func.isRequired
};

export default LoggedIn;