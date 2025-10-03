import styles from "./Credits.module.css"
import { useTranslation } from "react-i18next"
import SketchWrapper from "../SketchWrapper/SketchWrapper"
import SketchButton from "../SketchButton/SketchButton"

const Credits = ({backToTitle}) => {
    const { t } = useTranslation();

    return <>
    <div className={styles.credits_page}>
    <div className={styles.back_btn_div }>
      <SketchButton fill={{color:"bisque"}} className={styles.sketch_btn} type="button" form="player" onClick={backToTitle} text={t("back")}/>
    </div>
    <h1>{t("credits")}</h1>
    <div className={styles.credits}>
    <div className={styles.authorsContainer}>
        <SketchWrapper fill="chartreuse" stroke="seagreen">
        <div className={styles.creditItem}>
        <h2>{t("authors")}</h2>
        <p>Mark Frongia & Noel Boi</p>
        </div>
        </SketchWrapper>
            <SketchWrapper fill="plum" stroke="fuchsia">
        <div className={styles.creditItem}>
        <h2>{t("art")}</h2>
        <p>Noel Boi</p>
        </div>
        </SketchWrapper>
        <SketchWrapper fill="cyan" stroke="slateblue">
        <div className={styles.creditItem}>
        <h2>{t("logo")}</h2>
        <p>Mark Frongia</p>
        </div>
        </SketchWrapper>
    </div>

        <SketchWrapper fill="yellow" stroke="darkgoldenrod">
    <div className={styles.creditItem}>
    <h2>{t("tools")}</h2>
    <ul><li>- React, React redux, redux persist</li>
        <li>- i18next</li>
        <li>- Vite</li>
        <li>- Rough.js</li>
        <li>- Random Words API (kushcreates.com)</li>
    </ul>
    </div>
    </SketchWrapper>
    {/* <div className={styles.creditItem}>
    <h2>{t("thanks")}</h2>
    <p>Il Sommo Paguro Supremo</p>
    </div> */}
    </div>
    <p id={styles.copyright}>© 2025. {t("copyright")}</p>
    </div>
    </>
}

export default Credits