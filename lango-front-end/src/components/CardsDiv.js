import React from 'react'
import FirstInputCard from './FirstInputCard'
import FirstCard from './FirstCard'
import styles from '../pages/HomePage.module.css'

export default function CardsDiv(props) {

    const words = props.wordsProps;

    const updateWords = (words) => {
        //console.log("CardsDiv::words: ", words);
        props.updateWords(words);
    };

    return (
        <div id={styles.cardsDiv}>
            <FirstInputCard wordsProps={words} updateWordsProps={updateWords} />
            <FirstCard wordsProps={words}/>
        </div>
    )
}
 