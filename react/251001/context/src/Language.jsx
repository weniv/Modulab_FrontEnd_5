import React from 'react'
import Content from './components/Content'
import LangSelector from './components/LangSelector'
import { LanguageProvider } from './LanguageProvider'

export default function Language() {
    return (
        <LanguageProvider>
            <LangSelector />
            <hr />
            <Content />
        </LanguageProvider>
    )
}
