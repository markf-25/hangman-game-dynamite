import SketchWrapper from "../SketchWrapper/SketchWrapper"

const SketchInput = ({fill, stroke, value, onChange, ...props}) => {
    return <>
    <SketchWrapper fill={fill} stroke={stroke}>
        <input
          value={value}
          onChange={onChange}
          {...props}
        />
        </SketchWrapper>
    </>
}

export default SketchInput