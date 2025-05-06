import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './book.module.css';

export default function Booking({user}) {
  const navigate = useNavigate();
  const [dentists, setDentists] = useState([]);
  const [slots, setSlots] = useState([]);
  //const [chosenDentist, setChosenDentist] = useState();
  const [chosenSlotId, setChosenSlotId] = useState();

  useEffect(() => {
    //const token = localStorage.getItem('token');
    if (user/**token && token.trim() !== ''**/) {
        axios.get(`http://localhost:5000/api/booking/dentists`)
        .then(res => setDentists(res.data));
    }
    else {
        //localStorage.setItem('redirectAfterLogin', '/book');
        navigate('/login?redirect=book'); //can have path param to control login form such as /login?returnTo=/book
    }
    
  }, []);

  const fetchSlots = (dentistId) => {
    axios.get(`http://localhost:5000/api/booking/slots/${dentistId}`)
      .then(res => setSlots(res.data));
  };

  const book = async (slotId) => {
    try {
        const res = await axios.post('http://localhost:5000/api/booking/book', {
            timeSlotId: slotId,
            userId: user.userId
            })
    
        alert('Appointment successfully booked');
        navigate('/dashboard');
    } catch (err) {
        console.error('Booking failed:', err);
        alert('Something went wrong while booking');
    }

    
  };

  return (
    <div className={styles.bookingformcontainer}>
        <form className={styles.bookingform} onSubmit={(e) => {
            e.preventDefault();
            book(chosenSlotId);
        }}>
            <div>
                <label for="dentist">Select a Dentist:</label>
                <select id="dentist" onChange={(e) => fetchSlots(e.target.value)}>
                    <option value="">-- Select a dentist --</option>
                    {dentists.map(d => (
                        <option value={d.id}>{d.name}</option>
                    ))};
                </select>
            </div>
            <div>
                <label>Select a time slot:</label>
                <select onChange={(e) => setChosenSlotId(e.target.value)}>
                    <option value="">-- Select a time slot --</option>
                    {slots.map(s => (
                        <option value={s.id}>{s.date} {s.time}</option>
                    ))};
                </select>
            </div>
            <div className={styles.buttoncontainer}>
                <button type="submit">Book</button>
            </div>
        </form>
    </div>
  );
}