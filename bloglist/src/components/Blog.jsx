import React from 'react';
import PropTypes from 'prop-types';
import Togglable from './Togglable';

const Blog = ({ user, blog, likeBlog, deleteBlog }) => <li className="blog" data-id={blog.id} data-likes={blog.likes}>
    <a href={blog.url}>"{blog.title}" by {blog.author || 'Anonymous'}</a>
    <Togglable labelOpen="Show details" labelClose="Hide details">
        <div className="blog__details">
            <div className="blog__url-string">
                <span>{blog.url}</span>
            </div>
            <div className="blog__likes">
                <span>Liked by {blog.likes}</span>
                <button className="blog__like-btn" onClick={likeBlog}>Like</button>
            </div>
            {blog.user && <div className="blog__user-details">
                Submitted by {blog.user.username}
                {blog.user.username === user.username && <button className="blog__deletion-btn" onClick={deleteBlog}>Delete blog</button>}
            </div>}
        </div>
    </Togglable>
</li>;

Blog.propTypes = {
    user: PropTypes.object.isRequired,
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
};

export default Blog;