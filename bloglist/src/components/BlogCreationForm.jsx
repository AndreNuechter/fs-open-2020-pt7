import React from 'react';
import PropTypes from 'prop-types';

const BlogCreationForm = ({ addBlog }) => <form onSubmit={addBlog} className="blog-creation-form">
    <h2>Add new Blog</h2>
    <label>
        <span>Title:</span>
        <input name="title" />
    </label>
    <label>
        <span>Author:</span>
        <input name="author" />
    </label>
    <label>
        <span>Likes:</span>
        <input type="number" min="0" step="1" defaultValue="0" name="likes" />
    </label>
    <label>
        <span>URL:</span>
        <input name="url" />
    </label>
    <button className="blog-creation-form__submit-btn">Add Blog</button>
</form>;

BlogCreationForm.propTypes = {
    addBlog: PropTypes.func.isRequired
};

export default BlogCreationForm;