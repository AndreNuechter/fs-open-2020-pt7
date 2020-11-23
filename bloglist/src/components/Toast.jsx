import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Message = styled.div`
    padding: 8px 4px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;

    &.error {
        background-color: rgba(255, 0, 0, 0.8);
    }
    
    &.success {
        background-color: rgba(0, 255, 0, 0.8);
    }
`;

const Toast = ({ msg, cls = 'success' }) => msg && <Message className={cls}>{msg}</Message>;

Toast.propTypes = {
    msg: PropTypes.string.isRequired,
    cls: PropTypes.string
};

export default Toast;