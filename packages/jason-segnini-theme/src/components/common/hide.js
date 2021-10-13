import { connect, styled, css } from "frontity"
import { useState, useEffect } from "react"
import { glow, glowForPolygon, makeAppear } from "../../styles/keyframes"
import { center } from "../../styles/common"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import Switch from "@frontity/components/switch"

const Hide = ({
    state, 
    type, 
    isComponentHidden, 
    ...rest
}) => {
    const color = state.theme.color
    const [hideStyles, setHideStyles] = useState(false)
    let timeout = 0

    if (isComponentHidden && !hideStyles) 
        timeout = setTimeout(() => {setHideStyles(true)}, 725)
    else if (!isComponentHidden)
        timeout = setTimeout(() => {setHideStyles(false)}, 300)

    useEffect(() => () => clearTimeout(timeout), [])

    return (
        <Switch>
            <OuterWrapper 
                when={type==='archive'} 
                archive
                isComponentHidden={hideStyles}
                color={color}
                css={hideStyles} 
                {...rest}
            >
                <HideButton 
                    archive
                    isComponentHidden={isComponentHidden}
                    color={color}
                >
                    {rest.children || <AnimatedText comp='h1' text='>'/>}
                </HideButton>
            </OuterWrapper>
            <OuterWrapper
                isComponentHidden={hideStyles} 
                color={color} 
                {...rest}
            >
                <Shadow color={color}/>
                <AnimatedWrapper css={wrapperStyles}>
                    <StyledBorder color={color}/>
                    <HideButton 
                        isComponentHidden={isComponentHidden}
                        color={color}
                    >
                        {rest.children || <AnimatedText comp='h1' text='<'/>}
                    </HideButton>
                    </AnimatedWrapper>
            </OuterWrapper>
        </Switch>
    )
}

export default connect(Hide)

const menuConfig = isComponentHidden => css`
    width: 47px;
    height: 40px;
    top: 3%;
    right: 9%;
    ${isComponentHidden 
        && css`transform: translateX(27px);`
    }
`

const archiveConfig = isComponentHidden => css`
    width: 47px;
    height: 43px;
    border-radius: 50%;
    top: calc(2.4% + 4.5px);
    left: 9%;
    ${isComponentHidden
        && css`transform: translateX(-29px)`
    }
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
    filter: 
        drop-shadow(0 0 3px ${props => props.color}) 
        opacity(.85);

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
    ${props => props.archive
        && css`
            background-color: rgba(0,0,0,.85);
            ${props.isComponentHidden
                && css`transform: scaleX(-1);`}
            filter: opacity(0);
            animation: 
                ${makeAppear()} .25s ease-out forwards,
                ${glow(
                    props.color, 5, 10, 0, 2
                )} .375s ease-out .25s 2 alternate forwards;

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
        ${props => !props.archive 
            && !props.isComponentHidden
            && 'right: 0;'
        }
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
        ${props => props.archive 
            ? 'padding-left: 3px;'
            : !props.isComponentHidden 
                && 'padding-right: 3px;'
        }
        ${center}
        ${props => !props.archive 
            && props.isComponentHidden
            && css`transform: 
                translateY(-50%) 
                translateX(-50%) 
                scaleX(-1);
            `
        }
    }
`

const OuterWrapper = styled.div`
    position: absolute;
    cursor: pointer;
    transition: transform .25s ease-out;
    ${props => props.archive 
        ? archiveConfig(props.isComponentHidden) 
        : menuConfig(props.isComponentHidden)
    }

    :hover {
        ${HideButton} {
            ::before {width: 100%;}
            h1 {color: black;}
        }

        ${Shadow} {
            animation: 
                ${props => 
                    glowForPolygon(props.color, 5, 9)
                } .25s ease-out forwards;
        }
    }
`