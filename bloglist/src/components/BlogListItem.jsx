import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Blog = styled.li`
    border-bottom: 1px solid black;
    max-width: 480px;
    padding: var(--padding);
    margin: 0 auto;

    &:nth-child(odd) {
        background: var(--content-bg-2);
    }

    &:last-child {
        border-bottom: 0;
    }

    & a {
        display: block;
    }
`;

const BlogListItem = ({ blog }) => <Blog className="blog" data-id={blog.id} data-likes={blog.likes}>
    <Link to={`blogs/${blog.id}`}>"{blog.title}" by {blog.author || 'Anonymous'}</Link>
</Blog >;

BlogListItem.propTypes = {
    blog: PropTypes.object.isRequired
};

export default BlogListItem;