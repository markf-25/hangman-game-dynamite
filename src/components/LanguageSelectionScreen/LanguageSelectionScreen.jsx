import ukFlag from "../../../public/uk_flag.png"
import italianFlag from "../../../public/italian_flag.png"
import { useState, useEffect } from "react"
import { useContext } from "react"
import { GameContext } from "../../context/GameProvider"
import SketchDialog from "../SketchDialog/SketchDialog";
import styles from "./LanguageSelectionScreen.module.css"
import { useTranslation } from "react-i18next";

const LanguageSelectionScreen = () => {
    const { t, i18n } = useTranslation();
    const {setView} = useContext(GameContext);
    const languages = [{ name: "english", id: "en", flag: ukFlag}, { name: "italian", id: "it", flag: italianFlag}]
    const [isPhone, setIsPhone] = useState(window.innerWidth < 768);

    if (isPhone) {
      console.log('Siamo probabilmente su un cellulare');
    }

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


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
   <SketchDialog message={t("device warning")} isOpen={isPhone} onClose={()=>setIsPhone(false)}/>
    </>
}

export default LanguageSelectionScreen