import React from 'react'
import { UseLanguage } from '../hooks/UseLanguage'


export default function Content() {

    const { languageData } = UseLanguage();

    return (
        <div>
            <h1>{languageData.title}</h1>
            <p>{languageData.greeting}</p>
            <p>{languageData.description}</p>
        </div>
    )
}
