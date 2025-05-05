import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignup = () => {
        axios.post('http://localhost:5000/api/signup', {
            name: name,
            email: email,
            password: password
        }).then(() => alert('successfully signed up!'));
        navigate('/login');
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
        }}>
            <input placeholder="name" onChange={handleNameChange} />
            <input type="email" placeholder="e-mail" onChange={handleEmailChange} />
            <input type="password" placeholder="password" onChange={handlePasswordChange} />
            <button type="submit">Sign Up</button>
        </form>
    )
}