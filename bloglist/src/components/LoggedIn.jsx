import React from 'react';
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom";
import PropTypes from 'prop-types';
import UsersList from './UsersList';
import User from './UserDetail';
import BlogArea from './BlogArea';
import BlogDetails from './BlogDetails';
import styled from 'styled-components';
import Button from './styled/Button';

const Nav = styled.nav`
    border: 1px solid black;
    box-shadow: 5px 5px 0 black;
    background-color: var(--content-bg);
    display: flex;
    justify-content: space-between;
    padding: var(--padding);
    margin-bottom: 16px;

    a {
        color: black;
        font-size: 1.2rem;
        text-decoration: none;
        padding: 2px 12px;
        display: inline-block;
        transform: translateY(1rem);
    }

    button {
        display: inline;
        margin-left: 16px;
    }
`;

const LoggedIn = ({ user, logOut, addBlog, likeBlog, deleteBlog, getRef, addComment }) => <Router>
    <Nav>
        <span className="nav-links">
            <Link to='/'>Blogs</Link>
            <Link to='/users'>Users</Link>
        </span>
        <span className="nav-info">
            <span>Logged in as {user.username}</span>
            <Button onClick={logOut}>Log Out</Button>
        </span>
    </Nav>

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