import React from 'react';
import {
    useParams,
    useHistory
} from "react-router-dom";

export default ({ anecdotes = [] }) => {
    const history = useHistory();
    const id = useParams().id;
    const anecdote = anecdotes.find(a => a.id === id);

    if (!anecdote) {
        history.push('/');
        return null;
    }

    return <div>
        <p>{anecdote.content}</p>
        <p>by {anecdote.author}</p>
        <p>has {anecdote.votes} vote{anecdote.votes === 1 ? '' : 's'}</p>
        <p>Read more at <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>;
};
