import React from 'react';
import {
    useHistory
} from 'react-router-dom';
import { useField } from '../hooks';
import Input from './Input.jsx';

export default ({ addNew, setMsg }) => {
    const history = useHistory();
    const content = useField('content');
    const author = useField('author');
    const info = useField('info');

    const handleSubmit = (e) => {
        e.preventDefault();
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        });
        history.push('/');
        setMsg('new anecdote created');
    };
    const reset = (e) => {
        e.preventDefault();
        [content, author, info].forEach(f => f.reset());
    };

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <Input {...content} />
                </div>
                <div>
                    author
                    <Input {...author} />
                </div>
                <div>
                    url for more info
                    <Input {...info} />
                </div>
                <button>create</button>
                <button onClick={reset}>clear</button>
            </form>
        </div>
    );
};