import SketchWrapper from "../SketchWrapper/SketchWrapper"
import styles from "./SketchButton.module.css"

const SketchButton = ({text, stroke, fill, shape,...props})=> {
return <>
<SketchWrapper fill={fill} shape={shape} stroke={stroke || "black"}>
    <button {...props}>{text}</button>
</SketchWrapper>
</>
}

export default SketchButton
