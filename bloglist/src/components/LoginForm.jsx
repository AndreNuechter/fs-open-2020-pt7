import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ logIn }) => <form onSubmit={logIn} className="login-form">
    <h2>Login</h2>
    <label>
        <span>Username:</span>
        <input name="username" />
    </label>
    <label>
        <span>Password:</span>
        <input name="password" type="password" />
    </label>
    <button className="login-form__submit-btn">Log In</button>
</form>;

LoginForm.propTypes = {
    logIn: PropTypes.func.isRequired
};

export default LoginForm;