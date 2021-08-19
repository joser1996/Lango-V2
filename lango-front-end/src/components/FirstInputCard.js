import React from 'react'
import styles from '../pages/HomePage.module.css'

export default function FirstInputCard(props) {

    const {english, japanese} = props.wordsProps;

    const translateRequest = () => {
        const sourceLanguage = 'english';
        const api = `?${sourceLanguage}=${english}`
        //console.log("URL: ", api)
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
        if (event.target.value === "") {
            console.log("CLearing::")
            props.updateWordsProps({english: "", japanese: ""})
        } else {
            props.updateWordsProps({english: event.target.value, japanese: japanese})
        }
    };

    return (
        <div id={styles.inputTextCard}>
            <textarea 
                wrap="physical" 
                id={styles.firstCardInput}
                onChange={onChange}
                onKeyPress={checkReturn}
                value={english}
            >
            </textarea>
        </div>
    )
}
 