import React, { useState, useEffect, useRef } from 'react';
import { toast } from "react-toastify";
import ChooseRestaurant from './components/ChooseRestaurant'
import AdminHeader from './components/AdminHeader'
import EditorBody from './components/EditorBody'


const Admin = ({setAuth}) => {
    
    const [name, setName] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    const getName = async () => {
        try {
            const response = await fetch('http://localhost:5000/dashboard/',{
                method: 'GET',
                headers: {
                    token: localStorage.token
                }
            })
            const parseRes = await response.json()
            
            setName(parseRes.user_name)
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getName();
    })

    const logout = e => {
        try {
            toast.success("Logout successfully");
            e.preventDefault();
            localStorage.removeItem("token")
            setAuth(false)
        } catch (err) {
            console.error(err.message)
        }
    }

    const getRestaurants = async() =>{
        await fetch(`http://localhost:5000/cuisines`)
            .then(response => response.json())
            .then(jsonData => setRestaurants(jsonData))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getRestaurants()
    },[]);

    const [choosedRest, setRest] = useState(0)
    return (
        <div className="admin-panel"> 
            <div className="admin-panel-body">
                <AdminHeader
                    name={name}
                    logout = {logout}
                />
                <div className="admin-panel-content">
                    
                    {(!choosedRest) ? <ChooseRestaurant 
                        restaurants={restaurants}
                        setRest = {setRest}
                    />: ''}
                    {(choosedRest) ?
                        <div>
                            <button href="#" className="btn btn-primary logout" onClick={()=> setRest(0)}>Назад до вибору ресторану</button>
                            <EditorBody choosedRest={choosedRest}/>
                        </div> 
                    : ''}
                </div>
            </div>
        </div>
    );
}

export default Admin;