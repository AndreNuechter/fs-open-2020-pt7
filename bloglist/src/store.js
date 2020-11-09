import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/users.js';
import blogReducer from './reducers/blogs.js';
import notificationReducer from './reducers/notification.js';

export default createStore(
    combineReducers({
        user: userReducer,
        blogs: blogReducer,
        notification: notificationReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
);