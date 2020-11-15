import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

export default () => {
    const id = useParams().id;
    const users = useSelector(({ users }) => users);
    const user = users.find(u => u.id === id);

    if (!user) return <></>;

    return <div>
        <h2>{user.username} created these blogs</h2>
        <ul>
            {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
        </ul>
    </div>;
};