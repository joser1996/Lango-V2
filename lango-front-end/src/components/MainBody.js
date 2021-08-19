import React from 'react'
import ButtonDiv from './ButtonDiv'
import CardsDiv from './CardsDiv'
import styles from '../pages/HomePage.module.css'

export default function MainBody() {
    return (
        <main id={styles.langoMain}>
            <CardsDiv />
            <ButtonDiv />
        </main>
    )
}
