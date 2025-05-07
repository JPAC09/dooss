import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './signup.module.css';

export default function Signup({user}) {
    const apiURL = process.env.REACT_APP_BACKEND_BASE_URL;
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [gender, setGender] = useState();
    const [birthdate, setBirthdate] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmationPassword, setConfirmationPassword] = useState();
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        if (password && confirmationPassword) {
            setIsPasswordMatch(password === confirmationPassword);
        } else {
            setIsPasswordMatch(true);
        }
    }, [password, confirmationPassword]);

    const handleSignup = () => {
        if (isPasswordMatch) {
            axios.post(`${apiURL}/api/signup`, {
                name: name,
                gender: gender,
                birthdate: birthdate,
                email: email,
                password: password
            })
            .then(() => alert('successfully signed up!'));

            if (user) {
                navigate('/dashboard');
            }
            else {
                navigate('/login');
            }
        }
    }

    return (
        <div className={styles.signupformcontainer}>
            <form className={styles.signupform} onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
            }}>
                <div>
                    <label for="name">Full Name:</label>
                    <input id="name" placeholder="Name" onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div>
                    <label for="gender">Gender:</label>
                    <select id="gender" name="gender" onChange={(e) => setGender(e.target.value)} required>
                        <option value="" disabled selected hidden>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label for="birthdate">Birthdate:</label>
                    <input id="birthdate" type="date" placeholder="Birthdate" onChange={(e) => setBirthdate(e.target.value)} required/>
                </div>
                <div>
                    <label for="email">E-mail:</label>
                    <input id="email" type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div>
                    <label for="confirmPass">Confirm password:</label>
                    <input id="confirmPass" type="password" placeholder="Confirm password" onChange={(e) => setConfirmationPassword(e.target.value)} required/>
                </div>
                {isPasswordMatch ?  null : <p>Passwords do not match.</p>}
                <div className={styles.buttoncontainer}>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}