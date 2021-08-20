import React, { Component } from 'react'
import styles from '../pages/HomePage.module.css';

export default class ReviewBody extends Component {

    checkAns = () => {
        console.log("Checking answer");
    };

    nextCard = () => {
        console.log("Next card")
        this.props.updateIndex();
    };



    render() {
        return (
            <main id={styles.langoMain}>
                <div id={styles.reviewTextCard}>
                    <p id="pReview">{this.props.currentPair? this.props.currentPair['word_two']: ""}</p>
                </div>

                <div id={styles.reviewInputCard}>
                    <textarea 
                        id="reviewTextArea" 
                        defaultValue="Hello"
                        onKeyPress={this.checkAns}>
                    </textarea>
                </div>
                <div id={styles.nextButtonDiv}>
                    <button id={styles.nextButton} onClick={this.nextCard}>Next</button>             
                </div>
            </main>
        )
    }
}
