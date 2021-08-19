import React from 'react'
import styles from '../pages/HomePage.module.css'

export default function FirstCard(props) {
    const {japanese } = props.wordsProps;
    return (
        <div id={styles.textCard}>
            <p id={styles.firstCard}>{props.wordsProps ? (japanese):("")}</p>
        </div>
    )
}
