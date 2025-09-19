import SketchWrapper from "../SketchWrapper/SketchWrapper"
import styles from "./SketchButton.module.css"

const SketchButton = ({text, fill, shape,...props})=> {
return <>
<SketchWrapper fill={fill} shape={shape}>
    <button {...props}>{text}</button>
</SketchWrapper>
</>
}

export default SketchButton
