import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function Login({setUser}) {
    
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
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async () => {
        try {
            
            const res = await axios.post('http://localhost:5000/api/login',
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
        <>
            {isBooking ? <p>Login to book an appointment</p> : null}
            {isDashboard ? <p>Login to view dashboard</p> : null}
            {isLogout ? <p>Succesfully logged out</p> : null}
            <form onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
            }}>
                <input type="email" placeholder="e-mail" onChange={handleEmailChange}/>
                <input type="password" placeholder="password" onChange={handlePasswordChange}/>
                <button type="submit">Login</button>
            </form>
        </>
    )
}