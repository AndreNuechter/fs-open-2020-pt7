import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

const user = { username: 'test' };
const blog = { title: 'title', author: 'author', likes: 42, url: 'www.test.io/url' };
const likeBlog = jest.fn();
let component;

beforeEach(() => {
    component = render(
        <Blog user={user} blog={blog} likeBlog={likeBlog} deleteBlog={() => -1} />
    );
});

describe('Blog.jsx', () => {
    test('initially displays title and author but hides likes and url', () => {
        expect(component.container).toHaveTextContent(blog.title);
        expect(component.container).toHaveTextContent(blog.author);
        expect(component.container).not.toHaveTextContent(
            new RegExp(`Liked by ${blog.likes}|${blog.url}`, 'igm')
        );
    });

    test('shows likes and url after clicking the "Show details" button', () => {
        component.container.getElementsByClassName('toggle-visibility-btn')[0].click();
        expect(component.container).toHaveTextContent(`Liked by ${blog.likes}`);
        expect(component.container).toHaveTextContent(blog.url);
    });

    test('clicking the "Like"-button calls the associated event handler', () => {
        component.container.getElementsByClassName('toggle-visibility-btn')[0].click();
        const likeBtn = component.container.getElementsByClassName('blog__like-btn')[0];
        likeBtn.click();
        likeBtn.click();
        expect(likeBlog.mock.calls).toHaveLength(2);
    });
});