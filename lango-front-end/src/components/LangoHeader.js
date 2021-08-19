import React from 'react'
import styles from '../pages/HomePage.module.css'

export default function LangoHeader(props) {
    const goToReview = () => {
        console.log("In goToReview");
        props.updateReviewingProps();
    };

    const goToHome = () => {
        console.log("Go to Home");
        props.updateReviewingProps();
    }
    const reviewing = props.reviewingProps;

    return (
        <header id={styles.langoHeader}>
            {
                reviewing ? (<button id={styles.addButton} onClick={goToHome}>Add</button>) :
                    (<button id={styles.startButton} onClick={goToReview}>Start Review</button>)
            }
            
            <h1 id={styles.langoLogo}>Lango!</h1>
        </header>
    )
}