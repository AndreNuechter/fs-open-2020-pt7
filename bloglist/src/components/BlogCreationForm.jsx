import React from 'react';
import PropTypes from 'prop-types';
import Button from './styled/Button';
import Label from './styled/Label';

const BlogCreationForm = ({ addBlog }) => <form onSubmit={addBlog} className="blog-creation-form">
    <h2>Add new Blog</h2>
    <Label>
        <span>Title:</span>
        <input name="title" />
    </Label>
    <Label>
        <span>Author:</span>
        <input name="author" />
    </Label>
    <Label>
        <span>Likes:</span>
        <input type="number" min="0" step="1" defaultValue="0" name="likes" />
    </Label>
    <Label>
        <span>URL:</span>
        <input name="url" />
    </Label>
    <Button className="blog-creation-form__submit-btn">Add Blog</Button>
</form>;

BlogCreationForm.propTypes = {
    addBlog: PropTypes.func.isRequired
};

export default BlogCreationForm;