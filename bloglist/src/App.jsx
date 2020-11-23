import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { loadUserList } from './reducers/users.js';
import { init, logout, login } from './reducers/user.js';
import { load, add, like, del, comment } from './reducers/blogs.js';
import { notify } from './reducers/notification.js';
import './App.css';
import LoggedIn from './components/LoggedIn';
import LoginForm from './components/LoginForm';
import Toast from './components/Toast';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(({ user }) => user);
    const notification = useSelector(({ notification }) => notification);

    useEffect(() => {
        dispatch(init());
        dispatch(load());
        dispatch(loadUserList());
    }, [dispatch]);

    const [cls, setCls] = useState('');
    const blogCreationFormRef = useRef();
    const setToast = (text, type) => {
        dispatch(notify(text));
        setCls(type);
    };
    const logIn = (event) => {
        const credentials = Object.fromEntries(new FormData(event.target).entries());
        const username = event.target.username.value;
        dispatch(login(credentials))
            .then(() => {
                setToast(`Welcome ${username}`, 'success');
            })
            .catch((error) => {
                if (error.response) {
                    setToast(error.response.data.error, 'error');
                }
            });
        event.preventDefault();
    };
    const logOut = () => {
        dispatch(logout());
        setToast('Logged out', 'success');
    };
    const addBlog = (event) => {
        const newBlog = Object.fromEntries(new FormData(event.target).entries());
        blogCreationFormRef.current.toggleVisibility();
        dispatch(add(newBlog, user.token))
            .then(() => {
                setToast(`Added ${newBlog.title} by ${newBlog.author}`, 'success');
            }).catch((error) => {
                if (error.response) {
                    setToast(error.response.data.error, 'error');
                }
            });
        event.preventDefault();
    };
    const likeBlog = ({ target }) => {
        const { id } = target.closest('.blog__details').dataset;
        target.disabled = true;
        dispatch(like(id))
            .then(() => {
                setToast('Liked', 'success');
            })
            .catch((error) => {
                if (error.response) {
                    setToast(error.response.data.error, 'error');
                }
            });
    };
    const deleteBlog = ({ target }) => {
        const { id } = target.closest('.blog').dataset;
        if (window.confirm('Delete Blog?')) dispatch(del(id, user.token))
            .then(() => {
                setToast('Blog deleted', 'success');
            })
            .catch((error) => {
                if (error.response) {
                    setToast(error.response.data.error, 'error');
                }
            });
    };
    const addComment = (event) => {
        const blogId = event.target.dataset.blogId;
        const commentField = event.target.comment;
        const content = commentField.value;

        event.preventDefault();

        if (!content) {
            setToast('No empty comments allowed', 'error');
            return;
        }

        commentField.value = '';
        dispatch(comment(blogId, content));
    };

    return <>
        <Toast msg={notification} cls={cls} />
        {(!user && <LoginForm logIn={logIn} />) || <LoggedIn
            getRef={() => blogCreationFormRef}
            user={user}
            logOut={logOut}
            addBlog={addBlog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            addComment={addComment} />}
    </>;
};

App.displayName = 'App';

export default App;