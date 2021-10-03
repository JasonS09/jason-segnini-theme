import { css } from "frontity"

export const center = css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const inputWithWrapper = css`
    position: relative;
    display: block;
    padding: 2px 1px;
    border: 0;
    z-index: 1;
`

export const input = (color, placeholderColor=color) => css`
    font-family: 'Share Tech Mono';
    color: ${color};
    border-radius: 3px;
    background-color: transparent;
    scrollbar-color: ${color} black;
    scrollbar-width: thin;

    :focus {
        outline: none;
        box-shadow: 0 0 10px ${color};
    }

    :-webkit-autofill {
        border: 1px solid ${color};
        box-shadow: 0 0 0 50px black inset;
        -webkit-text-fill-color: ${color};

        :focus {
            outline: none;
            box-shadow: 0 0 0 50px black inset,
                0 0 10px ${color};
        }

        ::first-line {font-family: 'Share Tech Mono';}
        ::selection {-webkit-text-fill-color: black;}
    }

    ::placeholder {color: ${placeholderColor}}
    ::selection {background-color: ${color}}
`

export const submit = color => css`
    cursor: pointer;
    padding: 4px;
    transition: color .25s ease-out;

    :hover {
        color: black;
        ::before {width: 100%;}
    }

    ::before {
        content: '';
        position: absolute;
        width: 0;
        height: 100%;
        border-radius: 3px;
        background-color: ${color};
        z-index: -1;
        transition: width .25s ease-out;
        ${center}
    }
`