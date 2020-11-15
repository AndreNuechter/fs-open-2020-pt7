import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/user.js';
import usersReducer from './reducers/users.js';
import blogReducer from './reducers/blogs.js';
import notificationReducer from './reducers/notification.js';

export default createStore(
    combineReducers({
        user: userReducer,
        users: usersReducer,
        blogs: blogReducer,
        notification: notificationReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
);