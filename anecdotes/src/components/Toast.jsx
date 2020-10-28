import React, { useEffect } from 'react';

let timeoutId;

export default ({ msg, setMsg }) => {
    useEffect(() => {
        if (timeoutId) window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => setMsg(''), 10000);
    }, [msg, setMsg]);

    return <div>{msg}</div>;
};