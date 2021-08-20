import React, { Component } from 'react'
import styles from '../pages/HomePage.module.css';

export default class ReviewBody extends Component {
P
    checkAns = () => {
        console.log("Checking answer");
    };

    render() {
        return (
            <main id={styles.langoMain}>
                <div id={styles.reviewTextCard}>
                    <p id="pReview"></p>
                </div>

                <div id={styles.reviewInputCard}>
                    <textarea 
                        id="reviewTextArea" 
                        defaultValue="Hello"
                        onKeyPress={this.checkAns}>
                    </textarea>
                </div>
                <div id={styles.nextButtonDiv}>
                    <button id={styles.nextButton}>Next</button>             
                </div>
            </main>
        )
    }
}
