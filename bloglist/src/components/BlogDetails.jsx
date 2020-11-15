import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

export default ({ user, likeBlog, deleteBlog }) => {
    const id = useParams().id;
    const blogs = useSelector(({ blogs }) => blogs);
    const blog = blogs.find(b => b.id === id);

    if (!blog) return <></>;

    return <div className="blog" data-id={blog.id} data-likes={blog.likes}>
        <h2>{blog.title}</h2>
        by {blog.author || 'Anonymous'}

        <div className="blog__details">
            <div className="blog__url-string">
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div className="blog__likes">
                <span>
                    Liked by {blog.likes}
                    <button className="blog__like-btn" onClick={likeBlog}>Like</button>
                </span>
            </div>
            {blog.user && <div className="blog__user-details">
                <span>Submitted by <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link></span>
                {blog.user.username === user.username &&
                    <button className="blog__deletion-btn" onClick={deleteBlog}>Delete blog</button>
                }
            </div>}
        </div>
    </div>;
};