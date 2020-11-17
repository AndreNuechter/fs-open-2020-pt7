import React from 'react';
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom";
import PropTypes from 'prop-types';
import UsersList from './UsersList';
import User from './User';
import BlogArea from './BlogArea';
import BlogDetails from './BlogDetails';

const padding = {
    paddingRight: 5
};

const LoggedIn = ({ user, logOut, addBlog, likeBlog, deleteBlog, getRef, addComment }) => <Router>
    <nav>
        <span className="nav-links">
            <Link to='/' style={padding}>Blogs</Link>
            <Link to='/users' style={padding}>Users</Link>
        </span>
        <span className="nav-info">
            <span>Logged in as {user.username}</span>
            <button onClick={logOut}>Log Out</button>
        </span>
    </nav>

    <Switch>
        <Route path="/users/:id">
            <User />
        </Route>
        <Route path="/users">
            <UsersList />
        </Route>
        <Route path="/blogs/:id">
            <BlogDetails user={user} addBlog={addBlog} likeBlog={likeBlog} deleteBlog={deleteBlog} addComment={addComment} />
        </Route>
        <Route path="/">
            <BlogArea getRef={getRef} user={user} addBlog={addBlog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
        </Route>
    </Switch>
</Router>;

LoggedIn.propTypes = {
    user: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    addBlog: PropTypes.func.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    getRef: PropTypes.func.isRequired
};

export default LoggedIn;