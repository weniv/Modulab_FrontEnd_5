import React from 'react'
import { UseLanguage } from '../hooks/UseLanguage';

export default function LangSelector() {

    const { changeLang, languageData, currentLang } = UseLanguage();

    return (
        <>
            <p>{languageData.languageSelector}</p>
            <button onClick={() => changeLang('en')} disabled={currentLang === 'en'}>English</button>
            <button onClick={() => changeLang('ko')} disabled={currentLang === 'ko'}>한국어</button>
            <button onClick={() => changeLang('ja')} disabled={currentLang === 'ja'}>일본어</button>
        </>
    )
}
