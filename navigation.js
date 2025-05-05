import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './navigation.module.css';

export default function Navigation({user}) {

    return (
        <div className={styles.navigationcontainer}>
            <div className={styles.navigationhome}>
                <Link to="/"><h1>Dental Office Online Scheduling System</h1></Link>
            </div>
            <nav>
                <Link to="/about">About</Link>
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