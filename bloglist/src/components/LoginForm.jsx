import React from 'react';
import PropTypes from 'prop-types';
import Button from './styled/Button';
import Label from './styled/Label';

const LoginForm = ({ logIn }) => <form onSubmit={logIn} className="login-form">
    <h2>Login</h2>
    <Label>
        <span>Username:</span>
        <input name="username" />
    </Label>
    <Label>
        <span>Password:</span>
        <input name="password" type="password" />
    </Label>
    <Button className="login-form__submit-btn">Log In</Button>
</form>;

LoginForm.propTypes = {
    logIn: PropTypes.func.isRequired
};

export default LoginForm;