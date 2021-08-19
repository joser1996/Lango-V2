import React, { useState } from 'react'
import styles from '../pages/HomePage.module.css'

export default function FirstInputCard() {

    const [inputText, setInputText] = useState("");

    const translateRequest = () => {
        const sourceLanguage = 'english';
        const api = `?${sourceLanguage}=${inputText}`
        console.log("URL: ", api)
        fetch(`http://localhost:4000/translate/word${api}`)
            .then(res => res.json())
            .then(data => {
                console.log("Data: ")
                console.log(data)
            })
            .catch(err => console.error(err))
    };

    const checkReturn = (event) => {
        if (event.charCode === 13) {
            translateRequest();
        }
    };

 

    const onChange = (event) => {
        setInputText(event.target.value);
    };

    return (
        <div id={styles.inputTextCard}>
            <textarea 
                rows="1" 
                cols="50" 
                wrap="physical" 
                id={styles.firstCardInput}
                onChange={onChange}
                onKeyPress={checkReturn}
                value={inputText}
            >
            </textarea>
        </div>
    )
}
 