import React from 'react'
import FirstInputCard from './FirstInputCard'
import FirstCard from './FirstCard'
import styles from '../pages/HomePage.module.css'

export default function CardsDiv() {
    return (
        <div id={styles.cardsDiv}>
            <FirstInputCard />
            <FirstCard />
        </div>
    )
}
