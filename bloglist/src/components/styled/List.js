import styled from 'styled-components';

export default styled.ul `
    list-style: none;
    max-width: 480px;
    padding: var(--padding);
    margin: 0 auto;
    border: 1px solid black;
    background: var(--content-bg);
    box-shadow: 5px 5px 0 black;

    &.comment-section {
        border: 0;
        box-shadow: none;
    }
`;