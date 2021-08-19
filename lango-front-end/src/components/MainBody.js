import React, { useState } from 'react'
import ButtonDiv from './ButtonDiv'
import CardsDiv from './CardsDiv'
import styles from '../pages/HomePage.module.css'

export default function MainBody() {

    const [words, setWords] = useState({english: "", japanese: ""})

    const updateWords = (newWordObj) => {
        //console.log("MAIN::words: ", newWordObj);
        setWords(newWordObj);
    };


    return (
        <main id={styles.langoMain}>
            <CardsDiv wordsProps={words} updateWords={updateWords}/>
            <ButtonDiv wordsProps={words} updateWords={updateWords}/>
        </main>
    )
}
