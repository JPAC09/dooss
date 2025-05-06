import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './dashboard.module.css';

export default function Dashboard({user, setUser}) {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (user) {
        //     //const userId = localStorage.getItem('userId');
            const userId = user.userId;
            console.log(userId);
            axios.get(`http://localhost:5000/api/dashboard/${userId}`)
                .then(res => setAppointments(res.data));
        }
        else {
            navigate('/login?redirect=dashboard');
        }
      }, []);
    
    const handleCancel = (appointmentId) => {
        axios.delete(`http://localhost:5000/api/dashboard/${appointmentId}`)
            .then(() => {
                alert('appointment deleted!');
                setAppointments(prevAppointments => 
                    prevAppointments.filter(appointment => appointment.id !== appointmentId));
        });
    }

    const handleLogout = () => {
        // localStorage.removeItem('token');
        // localStorage.removeItem('userId');
        //alert('successfully logged out');
        setUser(null);
        navigate('/login?redirect=logout');
    }

    if (!user) {
        return null;
    }
    
    return (
        <div className={styles.dashboard}>
            <div className={styles.profile}>
                <table>
                    <tr><th colspan="2">Patient Information</th></tr>
                    <tr><td>Name:</td><td>{user.name}</td></tr>
                    <tr><td>Account ID:</td><td>{user.userId}</td></tr>
                    <tr><td>E-mail:</td><td>{user.email}</td></tr>
                    <tr><td>Gender:</td><td>{user.gender}</td></tr>
                    <tr><td>Birthdate:</td><td>{user.birthdate}</td></tr>
                </table>
                <div className={styles.buttonContainer}><button onClick={() => handleLogout()}>Logout</button></div>
            </div>

            <div className={styles.appointments}>
                <table>
                    <thead>
                        <tr>
                            <th>Dentist Name</th>
                            <th>Appointment Date</th>
                            <th>Appointment Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(a => (
                            <tr>
                                <td>{a.name}</td>
                                <td>{a.date}</td>
                                <td>{a.time}</td>
                                <td>
                                    <button onClick={() => handleCancel(a.id)}>CANCEL APPOINTMENT</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div>
                <ul>
                    {appointments.map(a => (
                        <li>{a.time_slot + ' ' + a.name}
                            <button onClick={() => handleCancel(a.id)}>Cancel</button>
                        </li>
                    ))}   
                </ul>
            </div> */}
        </div>
    );

}