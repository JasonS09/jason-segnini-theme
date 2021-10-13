import { connect } from "frontity"
import { commentIcons } from "../../../styles/common"

const SvgAddComment = ({state, isActive}) => {
    const color = state.theme.color

    return (
        <svg
            width="100%"
            height="100%"
            viewBox="-7 -4 60 54"
            xmlns="http://www.w3.org/2000/svg"
        >
            <ellipse
                cx={23.759}
                cy={20.465}
                rx={19.327}
                ry={12.152}
                strokeWidth={0.074}
                css={commentIcons(isActive, color)}
            />
            <path
                d="M8.61 22.556l11.563 5.42c-2.198 5.88-7.757 8.658-14.092 10.72 2.94-4.877 7.268-9.42 2.53-16.14z"
                strokeWidth={0.123}
                css={commentIcons(isActive, color)}
            />
            <path
                d="M23.226 14.354v12.35M17.051 20.238H29.4"
                fill="none"
                strokeWidth={1.256}
                strokeLinecap="round"
                css={commentIcons(!isActive, color)}
            />
        </svg>
    )
}

export default connect(SvgAddComment)