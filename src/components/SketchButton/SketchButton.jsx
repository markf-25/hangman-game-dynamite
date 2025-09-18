import styles from "./SketchButton.module.css"

const SketchButton = ({text, ...props}) => {
    return <>
    <button className={styles.button} {...props}>
    <wired-button>
        {text}
    </wired-button>
    </button>
    </>
}

export default SketchButton