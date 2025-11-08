import ukFlag from "../../../public/uk_flag.png"
import italianFlag from "../../../public/italian_flag.png"
import { useContext } from "react"
import { GameContext } from "../../context/GameProvider"
import styles from "./LanguageSelectionScreen.module.css"
import { useTranslation } from "react-i18next";

const LanguageSelectionScreen = () => {
    const {i18n } = useTranslation();
    const {setView} = useContext(GameContext);
    const languages = [{ name: "english", id: "en", flag: ukFlag}, { name: "italian", id: "it", flag: italianFlag}]

    const languageSelected = (lang) => {
        i18n.changeLanguage(lang.id)
        setView("start")   
    }

    return <>
    <div className={styles.flags_container}>
      {languages.map(lang => (

        <img
          key={lang.id}
          src={lang.flag}
          onClick={()=>languageSelected(lang)}
          className={styles.flag}
        />

      ))}
    </div>
    </>
}

export default LanguageSelectionScreen