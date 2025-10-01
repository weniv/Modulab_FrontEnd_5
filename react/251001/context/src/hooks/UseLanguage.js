import { useContext } from "react"
import { LanguageContext } from "../LanguageProvider"



export const UseLanguage = () => {
    const context = useContext(LanguageContext);

    return {
        languageData: context.languages[context.languageState],
        currentLang: context.languageState,
        changeLang: context.changeLanguage
    }
}