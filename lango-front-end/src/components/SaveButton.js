import React from 'react'
import styles from '../pages/HomePage.module.css'
export default function SaveButton() {
    const storeWords = () => {
        console.log("In storeWords")
    };

    return (
        <button className={styles.butt} onClick={storeWords}>Save</button>
    )
}
