import React from 'react'
import styles from '../pages/HomePage.module.css'
export default function SaveButton(props) {
    const host = 'https://lango-back-end.herokuapp.com'
    const storeWords = () => {
        if(props.wordsProps != null) {
            console.log("Storing Words: ", props.wordsProps);
            const {english, japanese} = props.wordsProps;
            if (english && japanese) {
                let url = `${host}/store/words?english=${english}&japanese=${japanese}`
                fetch(url, {credentials: 'include'})
                    .then(res => res.json())
                    .then(data => {
                        if (data.status) {
                            console.log("Clearing")
                            props.updateWordsProps({english: "", japanese: ""})
                        }
                    })
                    .catch(err => console.error("ERR: ", err));
            }
            //once we're done clear the cards
        }
    };

    return (
        <button className={styles.butt} onClick={storeWords}>Save</button>
    )
}
