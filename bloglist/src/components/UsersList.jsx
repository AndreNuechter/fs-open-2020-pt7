import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default () => {
    const users = useSelector(({ users }) => users);

    return <div>
        <h2>Users</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th><th># blogs</th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => <tr key={u.id}>
                    <td><Link to={`/users/${u.id}`}>{u.username}</Link></td><td>{u.blogs.length}</td>
                </tr>)}
            </tbody>
        </table>
    </div>;
};