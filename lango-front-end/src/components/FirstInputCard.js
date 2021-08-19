import React, { useState } from 'react'
import styles from '../pages/HomePage.module.css'

export default function FirstInputCard(props) {

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
                props.updateWordsProps(data)
            })
            .catch(err => console.error(err))
    };

    const checkReturn = (event) => {
        if (event.charCode === 13) {
            event.preventDefault();
            translateRequest();
        }
    };

 

    const onChange = (event) => {
        setInputText(event.target.value);
        if (event.target.value === "") {
            props.updateWordsProps({english: "", japanese: ""})
        }
    };

    return (
        <div id={styles.inputTextCard}>
            <textarea 
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
 