import React, { Component } from 'react'
import styles from '../pages/HomePage.module.css';

export default class ReviewBody extends Component {

    checkAns = (e) => {
        if (e.charCode === 13) {
            e.preventDefault();
            const wordOne = this.props.currentPair['word_one'];
            const answer = this.props.answer;
            if (wordOne.toLowerCase() === answer.toLowerCase()) {
                //correct
                console.log('Correct')
                this.props.updateIndex();
                this.props.updateAnswer("");
            } else {
                //Incorrect
                console.log('Incorrect')
            }
        }       
    };

    nextCard = () => {
        console.log("Next card")
        this.props.updateIndex();
    };

    onChange = (event) => {
        this.props.updateAnswer(event.target.value);
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
                        value={this.props.answer}
                        onKeyPress={this.checkAns}
                        onChange={this.onChange}>
                    </textarea>
                </div>
                <div id={styles.nextButtonDiv}>
                    <button id={styles.nextButton} onClick={this.nextCard}>Next</button>             
                </div>
            </main>
        )
    }
}
