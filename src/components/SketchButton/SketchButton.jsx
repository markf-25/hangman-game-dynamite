import SketchWrapper from "../SketchWrapper/SketchWrapper"

const SketchButton = ({ text, stroke, fill, shape, ...props }) => {

  const getStroke = ({ state, value, color }) => {
    if (value === state) return color;

    return "transparent";
  }

const getFill = ({ isDisabled = false, color}) => {
  return isDisabled ? "lightsteelblue" : color;
};

return <>
<SketchWrapper fill={getFill(fill)} shape={shape} stroke={stroke ? getStroke(stroke) : "black"}>
    <button {...props}>{text}</button>
</SketchWrapper>
</>
}

export default SketchButton
