import SketchWrapper from "../SketchWrapper/SketchWrapper"
import styles from "./SketchButton.module.css"

const SketchButton = ({ text, stroke, fill, shape, ...props }) => {

  const getStroke = ({ state, value, color }) => {
    if (value === state) return color;

    return value;
  }

const getFill = ({ isDisabled = false, color}) => {
  return isDisabled ? "lightsteelblue" : color;
};

return <>
<SketchWrapper fill={getFill(fill)} shape={shape} stroke={stroke ? getStroke(stroke) : "black"}>
    <button {...props}><p className={styles.text}>{text}</p></button>
</SketchWrapper>
</>
}

export default SketchButton
