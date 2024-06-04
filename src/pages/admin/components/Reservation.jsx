import React, { Fragment, useState, useEffect } from 'react';

// import { toast } from "react-toastify";



export default function Reservation({choosedRest}){

    const [booking, setBooking] = useState([])
    const getBooking = async() =>{
        await fetch(`https://restaraunt-lilac.vercel.app/booking/cuisine/${choosedRest}`)
            .then(response => response.json())
            .then(jsonData => setBooking(jsonData))
            .catch(err => console.error(err.message));
    }
    useEffect(() => {
        getBooking()
    },[]);

    const deleteBooking = async (id) => {
        if (window.confirm('Видалити категорію?'))
        try {
            await fetch (`https://restaraunt-lilac.vercel.app/booking/${id}`,{
                method: 'DELETE'
            })
            getBooking();
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <Fragment>
            <table className="table table-secondary">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Почта</th>
                        <th>Кол-во</th>
                        <th>Номер телефона</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                       booking.map((item, index) => (
                           <tr key={index}>
                                <td>{item.booking_date.slice(0,10)}</td>
                                <td>{item.booking_time}</td>
                                <td>{item.client_surname}</td>
                                <td>{item.client_name}</td>
                                <td>{item.email}</td>
                                <td>{item.number_of_people}</td>
                                <td>{item.phone_number}</td>
                                <td>
                                    <button 
                                        className="btn btn-danger"
                                        onClick = {() => deleteBooking(item.booking_id)}
                                    >
                                        Видалити
                                    </button>
                                </td>
                           </tr>
                       )) 
                    }
                </tbody>
            </table>
        </Fragment>
    )
}
