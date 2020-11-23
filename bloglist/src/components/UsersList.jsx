import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Table = styled.table`
    border-collapse: collapse;
    border-bottom: 1px solid black;
    max-width: 480px;
    padding: var(--padding);
    margin: 0 auto;
    background: var(--content-bg);
    box-shadow: 5px 5px 0 black;

    thead {
        background: var(--content-bg-2);
    }

    th,
    td {
        border: 1px solid black;
        padding: var(--padding);
    }

    tr {
        text-align: right;
    }
`;

export default () => {
    const users = useSelector(({ users }) => users);

    return <div>
        <h2>Users</h2>
        <Table>
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
        </Table>
    </div>;
};