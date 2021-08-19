import React from 'react'
import styles from '../pages/HomePage.module.css'

export default function LangoHeader() {
    const goToReview = () => {
        console.log("In goToReview");
    };

    return (
        <header id={styles.langoHeader}>
            <button id={styles.startButton} onClick={goToReview}>Start Review</button>
            <h1 id={styles.langoLogo}>Lango!</h1>
        </header>
    )
}
