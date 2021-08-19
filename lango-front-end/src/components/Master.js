import React, { useState } from 'react'
import LangoHeader from './LangoHeader'
import MainBody from './MainBody'
import ReviewBody from './ReviewBody'
import LangoFooter from './LangoFooter'
import Styles from '../pages/HomePage.module.css'


export default function Master() {
    const [reviewing, setReviewing] = useState(false);

    const updateReviewing = () => {
        setReviewing(!reviewing);
    };
    return (
        <div id={Styles.masterDiv}>
            <LangoHeader reviewingProps={reviewing} updateReviewingProps={updateReviewing}/>
            {reviewing ? (<ReviewBody />) : (<MainBody />)}
            <LangoFooter />
        </div>
    )
}
