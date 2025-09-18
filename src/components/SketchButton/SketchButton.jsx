import styles from "./SketchButton.module.css"
import SketchWrapper from "../SketchWrapper/SketchWrapper"

const SketchButton = ({text, ...props}) => {
    return <>
    <SketchWrapper>
        <button className={styles.button} {...props}>{text}</button>
    </SketchWrapper>
    </>
}

export default SketchButton