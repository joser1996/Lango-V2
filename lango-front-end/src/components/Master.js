import React from 'react'
import LangoHeader from './LangoHeader'
import MainBody from './MainBody'
import LangoFooter from './LangoFooter'
import Styles from '../pages/HomePage.module.css'

export default function Master() {
    return (
        <div id={Styles.masterDiv}>
            <LangoHeader />
            <MainBody />
            <LangoFooter />
        </div>
    )
}
