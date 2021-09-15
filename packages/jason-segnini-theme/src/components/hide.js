import {connect, styled, css} from "frontity"
import {useState} from "react"
import {glow, glowForPolygon, makeAppear} from "../styles/keyframes"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import Switch from "@frontity/components/switch"

const Hide = ({
    state, 
    right, 
    isComponentHidden, 
    ...rest
}) => {
    const color = state.theme.color
    const [hideStyles, setHideStyles] = useState(null)

    if (isComponentHidden && !hideStyles) 
        setTimeout(() => {
            setHideStyles(right 
                ? css`
                    position: fixed; 
                    left: auto; 
                    right: 1em;
                    ${HideButton} {::before {right: 0;}}
                `
                : css`
                    position: fixed; 
                    left: 1em;
                    ${HideButton} {::before {right: auto;}}
                `
            )
        }, 725)
    else if (!isComponentHidden)
        setTimeout(() => {setHideStyles(null)}, 300)

    const setText = () => {
        if (right) {
            if (isComponentHidden) return "<"
            return ">"
        }

        if (isComponentHidden) return ">"
        return "<"
    }

    return (
        <Switch>
            <OuterWrapper when={right} right css={hideStyles} {...rest}>
                <HideButton 
                    right 
                    color={color}
                    isComponentHidden={isComponentHidden}
                >
                    <AnimatedText comp="h1" text={setText()}/>
                </HideButton>
            </OuterWrapper>
            <OuterWrapper color={color} css={hideStyles} {...rest}>
                <Shadow color={color}/>
                <AnimatedWrapper css={wrapperStyles}>
                    <StyledBorder color={color}/>
                    <HideButton 
                        color={color}
                        isComponentHidden={isComponentHidden}
                    >
                        <AnimatedText comp="h1" text={setText()}/>
                    </HideButton>
                    </AnimatedWrapper>
            </OuterWrapper>
        </Switch>
    )
}

export default connect(Hide)

const leftConfig = css`
    width: 47px;
    height: 40px;
    top: 3%;
    right: 9%;
`

const rightConfig = css`
    width: 47px;
    height: 43px;
    top: calc(2.4% + 4.5px);
    left: 9%;
    border-radius: 50%;
`

const center = css`
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
`

const wrapperStyles = css`
    position: absolute;
    width: 100%;
    height: 100%;
    right: 0;
    clip-path: polygon(
        0% 0%, 
        66% 0, 
        100% 26%, 
        100% 74%, 
        66% 100%, 
        0 100%
    );
    ${center}
    ::before {z-index: 1;}
    ::before, ::after {border-width: 2px;}
`

const Shadow = styled.div`
    animation:  ${props => css`
        ${glowForPolygon(
            props.color, 9, 3
        )} .25s ease-out 1,
        ${glowForPolygon(
            props.color
        )} 3s ease-out .25s alternate infinite;
    `};

    ::before {
        content: '';
        background-color: black;
        clip-path: polygon(
                0% 0%, 
                66% 0, 
                100% 26%, 
                100% 74%, 
                66% 100%, 
                0 100%
            );
    }

    &, ::before {
        position: absolute;
        width: 100%;
        height: 100%;
    }
`

const StyledBorder = styled.div`
    position: absolute;
    width: 40%;
    height: 100%;
    right: 0;
    background-color: ${props => props.color};
    clip-path: polygon(
        0% 0%, 
        100% 0%, 
        100% 100%, 
        0% 100%, 
        100% 70%, 
        100% 30%
    );
    z-index: 1;
    filter: opacity(0);
    animation: 
        ${makeAppear()} .10s ease-out .20s forwards;
`

const HideButton = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    ${props => props.right 
        && css`
            background-color: rgba(0,0,0,.85);
            filter: opacity(0);
            animation: 
                ${makeAppear()} .25s ease-out forwards,
                ${glow(
                    props.color, 5, 10, 0, 2
                )} .375s ease-out .25s 2 alternate,
                ${glow(
                    props.color, 5, 10
                )} 3s ease-out 1s alternate infinite;

            ::after {
                content: '';
                position: absolute;
                width: calc(100% - 4px);
                height: calc(100% - 4px);
                top: 0;
                border: 2px solid ${props.color};
                ${center}
            }

            &, ::after {border-radius: 50%;}
        `
    }

    ::before {
        content: '';
        position: absolute;
        width: 0;
        height: 100%;
        ${props => !props.right && 'right: 0;'}
        background-color: ${props => props.color};
        z-index: -1;
        transition: width .25s ease-out;
    }

    h1 {
        font-family: 'Share Tech Mono';
        font-size: 20px;
        letter-spacing: normal;
        position: absolute;
        color: ${props => props.color};
        text-align: center;
        transition: color .25s ease-out;
        ${props => props.right 
            ? props.isComponentHidden
                ? "padding-right: 2px;"
                : "padding-left: 3px;"
            : !props.isComponentHidden
               && "padding-right: 3px;"
        }
        ${center}
    }
`

const OuterWrapper = styled.div`
    position: absolute;
    cursor: pointer;
    ${props => props.right ? rightConfig : leftConfig}

    :hover {
        ${HideButton} {
            ::before {width: 100%;}
            h1 {color: black;}
        }

        ${Shadow} {
            animation: 
                ${props => glowForPolygon(
                    props.color, 5, 9
                )} .25s ease-out forwards;
        }
    }
`