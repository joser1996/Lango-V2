import React from 'react'
import SaveButton from './SaveButton'
import styles from '../pages/HomePage.module.css'

export default function ButtonDiv(props) {
    return (
        <div id={styles.buttonDiv}>
            <SaveButton wordsProps={props.wordsProps} updateWordsProps={props.updateWords}/>
        </div>
    )
}
