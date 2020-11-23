import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import List from './styled/List';
import ListItem from './styled/ListItem';
import Button from './styled/Button';

const Item = styled.div`
    max-width: 480px;
    padding: var(--padding);
    margin: 0 auto;
    border: 1px solid black;
    background: var(--content-bg);
    box-shadow: 5px 5px 0 black;

    .blog__author {
        margin-bottom: 12px;
    }
`;
const CommentInput = styled.label`
    display: flex;
    flex-direction: column;
    margin: 0 auto 12px;
`;

export default ({ user, likeBlog, deleteBlog, addComment }) => {
    const id = useParams().id;
    const blogs = useSelector(({ blogs }) => blogs);
    const blog = blogs.find(b => b.id === id);

    if (!blog) return <></>;

    return <Item className="blog__details" data-id={blog.id} data-likes={blog.likes}>
        <h2>{blog.title}</h2>
        <div className="blog__author">by {blog.author || 'Anonymous'}</div>

        <div>
            <div className="blog__url-string">
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div className="blog__likes">
                <span>
                    Liked by {blog.likes}
                    <Button className="blog__like-btn" onClick={likeBlog}>Like</Button>
                </span>
            </div>
            {blog.user && <div className="blog__user-details">
                <span>Submitted by <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link></span>
                {blog.user.username === user.username &&
                    <Button className="blog__deletion-btn" onClick={deleteBlog}>Delete blog</Button>
                }
            </div>}
        </div>

        <h2>Comments</h2>
        <form onSubmit={addComment} data-blog-id={blog.id}>
            <CommentInput>
                <span>Add comment:</span>
                <textarea name="comment"></textarea>
            </CommentInput>
            <Button>Submit</Button>
        </form>
        <List className="comment-section">
            {blog.comments.map(({ content, id }) => <ListItem key={id}>{content}</ListItem>)}
        </List>
    </Item>;
};