import { connect } from "frontity"
import { commentIcons } from "../../../styles/common";

const SvgComments = ({state, isActive}) => 
    <svg
      width="100%"
      height="100%"
      viewBox="-7 -4 60 54"
      xmlns="http://www.w3.org/2000/svg"
    >
        <g css={commentIcons(isActive, state.theme.color)}>
            <ellipse
            cx={23.5}
            cy={20.465}
            rx={19.327}
            ry={12.152}
            strokeWidth={0.074}
            />
            <path
            d="M8.61 22.556l11.563 5.42c-2.198 5.88-7.757 8.658-14.092 10.72 2.94-4.877 7.268-9.42 2.53-16.14z"
            strokeWidth={0.123}
            />
        </g>
    </svg>

export default connect(SvgComments);