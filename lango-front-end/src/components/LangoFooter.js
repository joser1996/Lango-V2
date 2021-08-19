import React, { useContext } from 'react'
//import styles from '../pages/HomePage.module.css'
import { Link } from 'react-router-dom';
import { myContext } from '../components/Context'

export default function LangoFooter() {
    const context = useContext(myContext);
    return (
        <footer>
            <p id="langoUser">Welcome {context ? (context.userName) : (<li><Link to="/login">Login</Link></li>)}</p>
        </footer>
    )
}
