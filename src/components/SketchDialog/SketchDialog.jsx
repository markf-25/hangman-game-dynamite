import SketchWrapper from "../SketchWrapper/SketchWrapper"
import styles from "./SketchDialog.module.css"

const SketchDialog =({isOpen, children})=> {

    if (!isOpen) return null

    return <>
    <div className={styles.overlay}>
    <SketchWrapper fill="white">
    <div className={styles.dialog_container}>
    {children}
    </div>
    </SketchWrapper>
    </div>
    </>
}

export default SketchDialog