import React, { Fragment, useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import InputMask from 'react-input-mask';
import { toast } from "react-toastify";

import Grid from '@mui/material/Grid';




const RestaurantPageBody = ({restId}) => {


    const [restaurant, setRest] = useState([]);
    const [array, setArray] = useState([])
    const getRest = async() =>{
        await fetch(`http://localhost:5000/cuisines/${restId}`)
            .then(response => response.json())
            .then(jsonData => setRest(jsonData))
            .catch(err => console.log(err));
            // setArray(splitArrayIntoChunksOfLen(restaurant.description.split(/(?=<p>)/), 3))
    }
    useEffect(() => {
        getRest()
    },[]);

    const [dishes, setDish] = useState([])
    const getDish = async() =>{
        await fetch(`http://localhost:5000/menu`)
            .then(response => response.json())
            .then(jsonData => setDish(jsonData))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getDish()
    },[]);

    function splitArrayIntoChunksOfLen(arr, len) {
        var chunks = [], i = 0, n = arr.length;
        while (i < n) {
            chunks.push(arr.slice(i, i += Math.ceil(arr.length/len)));
        }
        return chunks;
    }

    const [sections, setSection] = useState([])
    const getSection = async() =>{
        await fetch(`http://localhost:5000/section_and_cuisines/${restId}`)
            .then(response => response.json())
            .then(jsonData => setSection(jsonData))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getSection()
    },[]);


    
    const [client_name, setClName] = useState('');
    const [client_surname, setClSurname] = useState('');
    const [phone_number, setPhNum] = useState('');
    const [email, setEmail] = useState('');
    const [number_of_people, setPeopleNumb] = useState('');
    const [booking_date, setBookgDate] = useState('');
    const [booking_time, setBookTime] = useState('');
    const [cuisine_id, setCuisineId] = useState(restId);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    
    const onSubmitForm = async(props) => {
        // e.preventDefault();
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) return toast.error("Неправильно вписана електронна пошта")
            if ( new Date(booking_date).getTime() < new Date(today).getTime()) return toast.error("Вписана неправильна дата")
        try {
            const body = { client_name, client_surname, phone_number, email, booking_date, booking_time, cuisine_id, number_of_people };
            const response = await fetch("/booking", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
            toast.success("Очікуйте лист на поштову адресу")
            setClName('')
            setClSurname('')
            setPhNum('')
            setEmail('')
            setPeopleNumb('')
            setBookgDate('')
            setBookTime('')
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <Fragment>
            {
                (restaurant.length !== 0) ?

                <main>
                    <div 
                        className="first-block-bg"
                        style={{backgroundImage: `url(/src/pages/pics/${restaurant.first_bg})`}}
                    >
                        <div 
                            className="first-rest-block"
                        >
                                <p className="first-rest-block-title">{restaurant.cuisine_name}</p>
                        </div>
                    </div>
                    
                    <div className='main'>
                        <div  className="menu" id="menu">
                            <h1>Menu</h1>
                            <div className="menu-list">
                                {(sections.length && dishes.length) ? sections.map((sec, index) => {
                                    
                                    const sectdish = [];
                                    for(let i = 0; i < dishes.length; i++){
                                        if(dishes[i].section_id === sec.section_id)  sectdish.push(dishes[i])
                                    }
                                    return(
                                    <details key = {index}>
                                        <summary className="menu-section-name"> {sec.section_name}</summary>
                                        {(sectdish.length) ? sectdish.map((dish, index) => (
                                            <div className="menu-item-body">
                                                <span className="dish-name">{dish.name}</span>
                                                <span className="dish-price">{dish.weight}</span>
                                                <div className="dish-description">{dish.description}</div>
                                            </div>
                                        )) : ''}                            
                                    </details>
                                )}) : ''}
                                {/* <p className="menu-section-name">Кондитерські та борошняні вироби</p>
                                <p className="menu-section-name">Холодні страви та закуски</p>
                                <p className="menu-section-name">Другі страви</p> */}
                            </div>
                        </div>
                        <div className="info-rest" id="info">
                            <p className="rest-block-title" >Інформація</p>
                            <Grid container>
                                <Grid item xs={12} md={3}>
                                    <div 
                                        className="info-rest-bg"
                                        style={{
                                            background: `url(/src/pages/pics/${(restaurant.image) ? restaurant.image : restaurant.first_bg}) 50% 50% / cover no-repeat`,
                                            backgroundSize: 'cover'
                                        }}
                                    >
                                        {/* Info Image */}
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={9} >
                                    <div className="info-rest-description">
                                        {/* <h3 style={{textAlign: 'center'}}>Інформація</h3> */}
                                        <div>{(restaurant.description) ? ReactHtmlParser(splitArrayIntoChunksOfLen(restaurant.description.split(/(?=<p>)/), 3)[0]) : ''}</div> 
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} md={9} >
                                    <div className="info-rest-description">
                                        <div>{(restaurant.description) ? ReactHtmlParser(splitArrayIntoChunksOfLen(restaurant.description.split(/(?=<p>)/), 3)[1]) : ''}</div> 
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <div 
                                        className="info-rest-bg"
                                        style={{
                                            background: `url(/src/pages/pics/${(restaurant.image2) ? restaurant.image2 : restaurant.first_bg}) 50% 50% / cover no-repeat`,
                                            backgroundSize: 'cover'
                                        }}
                                    >
                                        {/* Info Image */}
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} md={3}>
                                    <div 
                                        className="info-rest-bg"
                                        style={{
                                            background: `url(/src/pages/pics/${(restaurant.image3) ? restaurant.image3 : restaurant.first_bg}) 50% 50% / cover no-repeat`,
                                            backgroundSize: 'cover'
                                        }}
                                    >
                                        {/* Info Image */}
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={9} >
                                    <div className="info-rest-description">
                                        <div>{(restaurant.description) ? ReactHtmlParser(splitArrayIntoChunksOfLen(restaurant.description.split(/(?=<p>)/), 3)[2]) : ''}</div> 
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div 
                        className="first-block-bg"
                        style={{
                            backgroundImage: `url(/src/pages/pics/${(restaurant.second_bg) ? restaurant.second_bg : restaurant.first_bg})`
                        }}
                    >
                        <div 
                            className="quote"
                        >
                            <p>
                                { restaurant.quote ? restaurant.quote.split(/(?=[©])/)[0] : ''} 
                            </p>
                            <span className='author'>{restaurant.quote ? restaurant.quote.split(/(?=[©])/)[1] : ''}</span>
                        </div>
                    </div>




                    <div className="reservation"  id="reservation">
                        <Grid container
                            justify="center"
                            alignItems="center">
                            <Grid item xs={12} md={6}>
                                <div 
                                    className="info-reserv-bg"
                                    style={
                                        {background: `url(/src/pages/pics/${restaurant.image2 ? restaurant.image2 : restaurant.first_bg}) 50% 50% no-repeat`,
                                        backgroundSize: 'cover'
                                    }}
                                >
                                    {/* Info Image */}
                                </div>
                            </Grid>
                            <Grid item md={6} >
                                <div className="reservation-form">
                                    <div className="form">
                                        <h2 style={{textAlign: 'center', marginBottom:'15px'}}>Резервування</h2>
                                        <div className="form-part">
                                            <div>
                                                <label>Ім'я</label>
                                                <input name="name" value ={client_name} onChange={e => setClName(e.target.value)} placeholder="Ім'я"/>
                                                </div>
                                                <div>
                                                <label>Прізвище</label>
                                                <input name="surname" value ={client_surname} onChange={e => setClSurname(e.target.value)} placeholder="Прізвище"/>
                                            </div>
                                        </div>
                                        <div className="form-part">
                                            <div>
                                        <label>Електронна пошта</label>
                                        <input name="email" value ={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                                            </div>
                                            <div>
                                        <label>Номер телефону</label>
                                        <InputMask mask="+38(999)999-99-99" value ={phone_number} onChange={e => setPhNum(e.target.value)} ></InputMask>
                                            </div>
                                        </div>
                                        <div className="form-part">
                                            <div>
                                                <label>Дата</label>
                                                <input type="date" value ={booking_date} onChange={e => setBookgDate(e.target.value)} placeholder="Дата"/>
                                            </div>
                                            <div>
                                                <label>Час</label>
                                                <input type="time" value ={booking_time} onChange={e => setBookTime(e.target.value)} placeholder="Час"/>
                                            </div>
                                        </div>
                                        <label>Кількість людей</label>
                                        <input type="number" value={number_of_people} onChange={e => setPeopleNumb(e.target.value)} placeholder="Кількість людей"/>
                                        <button className="reservation-button-big" onClick={onSubmitForm}>Зарезервувати</button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </main>
            
                : ''
            }
        </Fragment>
    )
};
export default RestaurantPageBody;