import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import List from './styled/List';
import ListItem from './styled/ListItem';

export default () => {
    const id = useParams().id;
    const users = useSelector(({ users }) => users);
    const user = users.find(u => u.id === id);

    if (!user) return <></>;

    return <div>
        <h2>{user.username} added these blogs</h2>
        <List>
            {user.blogs.map(b => <ListItem key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></ListItem>)}
        </List>
    </div>;
};