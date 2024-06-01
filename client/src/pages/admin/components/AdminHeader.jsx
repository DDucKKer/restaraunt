import React, { Fragment, useEffect, useState } from 'react';
import logo from '../../pics/logo2.png';




export default function AdminHeader({name, logout}){
    const [info, setInfo] = useState([]);

    const getInfo = async() =>{
        await fetch('https://restaraunt-lilac.vercel.app/mainifo')
            .then(response => response.json())
            .then(jsonData => setInfo(jsonData))
            .catch(err => console.log(err));    
    }
    useEffect(() => {
        getInfo()
    },[]);


    return(
        <Fragment>
            {info.length ?
                <a href="/"><img src={`/src/pages/pics/${info[0].logo}`} alt='logo' className="adminlogo"/></a>
            :
                ''
            }
            <h4 className="username">Користувач: {name}</h4>
            <button className="btn btn-primary logout" onClick={e => logout(e)}>Вихід</button>
        </Fragment>
    )
}