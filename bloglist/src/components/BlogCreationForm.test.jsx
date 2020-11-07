import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import BlogCreationForm from './BlogCreationForm';

const newBlog = { title: 'title', author: 'author', likes: '42', url: 'www.test.io/url' };
const addBlog = jest.fn(({ target }) => [...target.getElementsByTagName('input')]
    .reduce((result, { name, value }) => ({
        ...result,
        [name]: value
    }), {}));
let component;

beforeEach(() => {
    component = render(
        <BlogCreationForm addBlog={addBlog} />
    );
});

describe('BlogCreationForm.jsx', () => {
    test('submitting the form calls the associated event handler', () => {
        const form = component.container.firstElementChild;
        Object.keys(newBlog).forEach(name => {
            form.querySelector(`[name="${name}"]`).value = newBlog[name];
        });
        form.dispatchEvent(new Event('submit'));
        expect(addBlog.mock.calls).toHaveLength(1);
    });

    test('the associated event handler receives the input values', () => {
        expect(addBlog.mock.results[0].value).toEqual(newBlog);
    });
});