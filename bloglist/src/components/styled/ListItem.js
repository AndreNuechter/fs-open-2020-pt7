import styled from 'styled-components';

export default styled.li `
    border-bottom: 1px solid black;
    max-width: 480px;
    padding: var(--padding);
    margin: 0 auto;

    &:nth-child(odd) {
        background: var(--content-bg-2);
    }

    &:last-child {
        border-bottom: 0;
    }

    & a {
        display: block;
    }
`;