import {css} from "frontity"

export const center = css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
`

export const inputWithWrapper = css`
    position: relative;
    display: block;
    padding: 2px 1px;
    border: 0;
    z-index: 1;
`

export const input = (color, pseudoClassColor=color) => css`
    font-family: 'Share Tech Mono';
    color: ${color};
    border-radius: 3px;
    background-color: transparent;

    :focus {
        outline: none;
        box-shadow: 0 0 10px ${color};
    }

    ::placeholder {color: ${pseudoClassColor}}

    :--webkit-autofill {
        background-color: ${pseudoClassColor};
    }

    ::-webkit-scrollbar-thumb {
        border: 1px solid ${color};
        :hover {background-color: ${color}}
    }

    ::selection {background-color: ${color};}
`