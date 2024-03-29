import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    useEffect(() =>{
        fetch('http://localhost:7000/bookings?email='+loggedInUser.email, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
        })
        .then(res => res.json())
        .then(data => setBookings(data));
    }, [])
    return (
        <div>
            <h3>you have: {bookings.length} bookings</h3>
            {
                bookings.map(book => <li key={book._id}>{(new Date(book.chekIn).toDateString('MM/dd/yyyy'))} from {(new Date(book.chekOut).toDateString('dd/MM/yyyy'))} to: {book.checkOut}</li>)
            }
        </div>
    );
};

export default Bookings;