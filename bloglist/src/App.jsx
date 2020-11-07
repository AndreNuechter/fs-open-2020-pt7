import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import userService from './services/users';
import LoggedIn from './components/LoggedIn';
import LoginForm from './components/LoginForm';
import Toast from './components/Toast';

const storageKey = 'user';
let timeoutId;

const App = () => {
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem(storageKey)));
    const [blogs, setBlogs] = useState([]);
    const [msg, setMsg] = useState('');
    const [cls, setCls] = useState('');
    const blogCreationFormRef = useRef();
    const setToast = (text, type) => {
        setMsg(text);
        setCls(type);
        if (timeoutId) window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => setMsg(''), 5000);
    };
    const logIn = (event) => {
        const credentials = Object.fromEntries(new FormData(event.target).entries());
        userService
            .logIn(credentials)
            .then((userData) => {
                setUser(userData);
                window.localStorage.setItem(storageKey, JSON.stringify(userData));
                setToast(`Welcome ${userData.username}`, 'success');
            })
            .catch((error) => {
                if (error.response) {
                    setToast(error.response.data.error, 'error');
                }
            });

        event.preventDefault();
    };
    const logOut = () => {
        window.localStorage.removeItem(storageKey);
        setUser(null);
        setToast('Logged out', 'success');
    };
    const addBlog = (event) => {
        const newBlog = Object.fromEntries(new FormData(event.target).entries());
        blogCreationFormRef.current.toggleVisibility();
        blogService
            .addOne(newBlog, user.token)
            .then(response => {
                setBlogs([...blogs, response]);
                setToast(`Added ${newBlog.title} by ${newBlog.author}`, 'success');
            })
            .catch((error) => {
                if (error.response) {
                    setToast(error.response.data.error, 'error');
                }
            });
        event.preventDefault();
    };
    const likeBlog = ({ target }) => {
        const { id } = target.closest('.blog').dataset;
        // TODO more effectively prevent multiple likes by the same person
        target.disabled = true;
        blogService
            .like(id)
            .then(() => {
                blogs.find(b => b.id === id).likes += 1;
                setBlogs(blogs);
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
        if (window.confirm('Delete Blog?')) blogService
            .deleteBlog(id, user.token)
            .then(() => {
                setBlogs(blogs.filter(b => b.id !== id));
                setToast('Blog deleted', 'success');
            })
            .catch((error) => {
                if (error.response) {
                    setToast(error.response.data.error, 'error');
                }
            });
    };

    useEffect(() => {
        if (user) {
            blogService
                .getAll()
                .then(response => {
                    setBlogs(response);
                });
        }
    }, [user]);

    return <>
        <Toast msg={msg} cls={cls} />
        {(!user && <LoginForm logIn={logIn} />) || <LoggedIn
            getRef={() => blogCreationFormRef}
            user={user}
            blogs={blogs}
            logOut={logOut}
            addBlog={addBlog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog} />}
    </>;
};

App.displayName = 'App';

export default App;