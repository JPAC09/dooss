import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './navigation.module.css';

export default function Navigation({user}) {

    return (
        <div className={styles.navigationcontainer}>
            <div className={styles.navigationhome}>
                <h1>🦷</h1>
                <Link to="/"><h1>Dental Office</h1></Link>
            </div>
            <nav>
                <Link to="/">About Us</Link>
                <Link to="/services">Services</Link>
                <Link to="/book">Book an Appointment</Link>
                <Link to="/signup">Sign up</Link>
                {!user ? <Link to="/login">Login</Link> : <Link to="/dashboard">Dashboard</Link>}
            </nav>
            <div className={styles.dividercontainer}>
                <hr/>
            </div>
        </div>
    )
}