import styles from "./Credits.module.css"
import { useTranslation } from "react-i18next"

const Credits = () => {
    const { t } = useTranslation();

    return <>
    <div className={styles.credits}>
    <h1>{t("credits")}</h1>
    <div className={styles.authorsContainer}>
        <div className={styles.creditItem}>
        <h2>{t("authors")}</h2>
        <p>Mark Frongia & Noel Boi</p>
        </div>
        <div className={styles.creditItem}>
        <h2>{t("art")}</h2>
        <p>Noel Boi</p>
        </div>
        <div className={styles.creditItem}>
        <h2>{t("logo")}</h2>
        <p>Mark Frongia</p>
        </div>
    </div>

    <div className={styles.creditItem}>
    <h2>{t("tools")}</h2>
    <p> - React CERCARE DEPENDENCIES{"\n"}
        - Vite{"\n"}
        - Rough.js{"\n"}
        - Random Words API (kushcreates.com){"\n"}
    </p>
    </div>
    {/* <div className={styles.creditItem}>
    <h2>{t("thanks")}</h2>
    <p>Il Sommo Paguro Supremo</p>
    </div> */}
    <p>© 2025. {t("copyright")}</p>
    </div>
    </>
}

export default Credits