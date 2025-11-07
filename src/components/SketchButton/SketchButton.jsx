import SketchWrapper from "../SketchWrapper/SketchWrapper"
import styles from "./SketchButton.module.css"
import useHover from "../../hooks/useHover"

const SketchButton = ({ text, stroke, fill, shape, isUseHoverActive = true, ...props }) => {

  const {isHovered, ref} = useHover(isUseHoverActive)

  const getStroke = ({ state, value, color }) => {
    if (value === state) return color;

    return value;
  }

const getFill = ({ isDisabled = false, color}) => {
  return isDisabled ? "lightsteelblue" : color;
};

return <>
<SketchWrapper fill={getFill(fill)} shape={shape} stroke={stroke ? getStroke(stroke) : "black"} reload={isHovered}>
    <button ref={isUseHoverActive? ref : null} {...props}><p className={styles.text}>{text}</p></button>
</SketchWrapper>
</>
}

export default SketchButton
