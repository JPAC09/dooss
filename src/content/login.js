import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styles from './login.module.css';

export default function Login({setUser}) {
    const apiURL = process.env.REACT_APP_BACKEND_BASE_URL;
    const navigate = useNavigate();
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    // const [isRedirect, setIsRedirect] = useState(false);

    
    const [param] = useSearchParams();
    const redirect = param.get('redirect') || null;
    const isBooking = redirect === 'book' ? true : false;
    const isDashboard = redirect === 'dashboard' ? true : false;
    const isLogout = redirect === 'logout' ? true : false;
    

    // useEffect(() => {
    //     if (localStorage.getItem('redirectAfterLogin') !== '') {
    //         setIsRedirect(true);
    //     }
    // },[]);

    const handleEmailChange = (e) => {
        console.log(redirect);
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async () => {
        try {
            
            const res = await axios.post(`${apiURL}/api/login`,
                {
                    email: email,
                    password: password
                });
            // localStorage.setItem('token', res.data.token);
            // localStorage.setItem('userId', res.data.userId);
            setUser({ token: res.data.token,
                              userId: res.data.userId,
                              name: res.data.name,
                              email: res.data.email,
                              gender: res.data.gender,
                              birthdate: res.data.birthdate})
            alert('Successful login');
            //location.reload();
            // const routeAfterLogin = localStorage.getItem('redirectAfterLogin') || '/dashboard'; //instead of localStorage to redirect after login, use login?booking=true params
            // localStorage.removeItem('redirectAfterLogin')
            // setIsRedirect(false);
            // navigate(routeAfterLogin);
            if (isBooking) {
                navigate('/book');
            }
            else {
                navigate('/dashboard');
            }
        } catch (err) {
            console.log(err);
            alert('Login failed');
        }
    }
    
    return (
        <div className={styles.loginformcontainer}>
            {isBooking ? <p>Login to book an appointment.</p> : null}
            {isDashboard ? <p>Login to view dashboard.</p> : null}
            {isLogout ? <p>Succesfully logged out.</p> : null}
            <form className={styles.loginform} onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
            }}>
                <div>
                    <label for="email">E-mail:</label>
                    <input id="email" type="email" placeholder="E-mail" onChange={handleEmailChange} required/>
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input id="password" type="password" placeholder="Password" onChange={handlePasswordChange} required/>
                </div>
                <div className={styles.buttoncontainer}>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}