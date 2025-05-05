import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation({user}) {

    return (
        <nav>
            <Link to="/"><h1>Dental Office Online Scheduling System</h1></Link> |
            <Link to="/about">About</Link> |
            <Link to="/services">Services</Link> |
            <Link to="/book">Book an Appointment</Link> |
            <Link to="/signup">Sign up</Link> |
            {!user ? <Link to="/login">Login</Link> : <Link to="/dashboard">Dashboard</Link>}
            
            <hr/>
        </nav>
    )
}