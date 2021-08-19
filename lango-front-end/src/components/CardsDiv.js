import React, { useState } from 'react'
import FirstInputCard from './FirstInputCard'
import FirstCard from './FirstCard'
import styles from '../pages/HomePage.module.css'

export default function CardsDiv() {

    const [words, setWords] = useState({})

    const updateWords = (newWordObj) => {
        setWords(newWordObj);
    }
    return (
        <div id={styles.cardsDiv}>
            <FirstInputCard updateWordsProps={updateWords}/>
            <FirstCard wordsObj={words}/>
        </div>
    )
}
 