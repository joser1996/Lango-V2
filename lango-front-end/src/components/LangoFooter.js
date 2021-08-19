import React, { useContext } from 'react'
//import styles from '../pages/HomePage.module.css'
import { myContext } from '../components/Context'

export default function LangoFooter() {
    const context = useContext(myContext);
    return (
        <footer>
            <p id="langoUser">Welcome {context ? (context.userName) : (" please log in")}</p>
        </footer>
    )
}
