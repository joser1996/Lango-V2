import React from 'react'
import styles from '../pages/HomePage.module.css'

export default function FirstCard(props) {
    const {english, japanese } = props.wordsObj;
    return (
        <div id={styles.textCard}>
            <p id={styles.firstCard}>{props.wordsObj ? (japanese):("")}</p>
        </div>
    )
}
