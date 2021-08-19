import React from 'react'
import SaveButton from './SaveButton'
import styles from '../pages/HomePage.module.css'

export default function ButtonDiv() {
    return (
        <div id={styles.buttonDiv}>
            <SaveButton />
        </div>
    )
}
