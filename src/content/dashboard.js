import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
      }, [user]);
    
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
        <>
            <div>
                <h3>Patient Profile</h3>
                <p>Name: {user.name}</p>
                <p>Account ID: {user.userId}</p>
                <p>E-mail: {user.email}</p>
                <p>Gender: {user.gender}</p>
                <p>Birthdate: {user.birthdate}</p>
                <button onClick={() => handleLogout()}>Logout</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Dentist Name</th>
                        <th>Appointment Date</th>
                        <th>Appointment Time</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(a => (
                        <tr>
                            <td>{a.name}</td>
                            <td>{a.date}</td>
                            <td>{a.time}</td>
                            <td>Completed</td>
                            <td>
                                <button onClick={() => handleCancel(a.id)}>Cancel appointment</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div>
                <ul>
                    {appointments.map(a => (
                        <li>{a.time_slot + ' ' + a.name}
                            <button onClick={() => handleCancel(a.id)}>Cancel</button>
                        </li>
                    ))}   
                </ul>
            </div> */}
        </>
    );

}