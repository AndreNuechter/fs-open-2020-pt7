import React from 'react';
import PropTypes from 'prop-types';

const Toast = ({ msg, cls = 'success' }) => msg && <div className={`${cls} toast`}>{msg}</div>;

Toast.propTypes = {
    msg: PropTypes.string.isRequired,
    cls: PropTypes.string
};

export default Toast;