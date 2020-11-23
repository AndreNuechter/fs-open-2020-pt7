import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import Button from './styled/Button';

const Togglable = React.forwardRef(({ children, labelOpen = 'Show', labelClose = 'Hide' }, ref) => {
    const [visible, setVisible] = useState(false);
    const toggleVisibility = () => setVisible(!visible);

    useImperativeHandle(ref, () => { return { toggleVisibility }; });

    return <>
        {visible && children}
        <Button className="toggle-visibility-btn" onClick={toggleVisibility}>{visible ? labelClose : labelOpen}</Button>
    </>;
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
    labelOpen: PropTypes.string,
    labelClose: PropTypes.string,
    children: PropTypes.object.isRequired
};

export default Togglable;