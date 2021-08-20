import React, { useEffect, useState } from 'react'
import LangoHeader from './LangoHeader'
import MainBody from './MainBody'
import ReviewBody from './ReviewBody'
import LangoFooter from './LangoFooter'
import Styles from '../pages/HomePage.module.css'


export default function Master() {
    const [reviewing, setReviewing] = useState(false);
    const [cards, setCards] = useState({});
    const [cardIndex, setCardIndex] = useState(0);

    useEffect(() => {
        if (reviewing) {
            console.log("Getting Flash cards")
            fetch('http://localhost:4000/get/cards', {credentials: 'include'})
                .then(res => res.json())
                .then(data => {
                    console.log('Recieved:', data)
                    setCards(data)
                }).catch(err => console.error('Error: ', err));
        }
    }, [reviewing])

    const updateReviewing = () => {
        setReviewing(!reviewing);
    };

    const updateIndex = () => {
        setCardIndex(prevIndex => {
            let index = prevIndex + 1;
            if (cards.length === index){
                index = 0;
            }
            console.log("Index updated to: ", index);
            return index;
        });
    }

    return (
        <div id={Styles.masterDiv}>
            <LangoHeader reviewingProps={reviewing} updateReviewingProps={updateReviewing}/>
            {reviewing ? (<ReviewBody cardsProps={cards} cardIndex={cardIndex} updateIndex={updateIndex} currentPair={cards[cardIndex]}/>) : (<MainBody />)}
            <LangoFooter />
        </div>
    )
}
