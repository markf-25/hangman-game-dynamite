import styles from "./KeyboardButton.module.css"

const KeyboardButton = ({letter}) => {
    return <>
    <button className={styles.key_btn} onClick={()=> console.log("Hai stampato ", letter)}>{letter}</button>
    </>
}

export default KeyboardButton