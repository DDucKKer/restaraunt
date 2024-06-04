import React, { Fragment, useState, } from 'react';
import { toast } from "react-toastify";
import logo from '../pics/logo2.png';


export default function Login({setAuth, info}) {

    const [inputs, setInputs] = useState({
        name: '',
        password: ''
    })
    const {name, password } = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name] : e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { name, password };
            const response = await fetch(
                "https://restaraunt-lilac.vercel.app/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();

            if(parseRes.token){
                localStorage.setItem("token", parseRes.token)
                setAuth(true);
                toast.success("Login successfully")
            }
            else{
                setAuth(false);
                toast.error(parseRes)
            }
        } catch (err) {
            console.error(err.message)
        }   
    }
    return (
        <div className= 'form-bg'>
            <header>
                
            {info.length ?
                <img src={`/pics/${info[0].logo}`} alt='logo' className="adminlogo"/>
            :
                ''
            }
            </header>
            <div className= 'form-body'>
                <h1 className="text-center">Login</h1>
                <form onSubmit={onSubmitForm}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="name" 
                        className="form-control my-4" 
                        value = {name}
                        onChange = {e => onChange(e)}
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="password" 
                        className="form-control my-4" 
                        value = {password}
                        onChange = {e => onChange(e)}
                    />
                    <button className="btn btn-success btn-block">Submit</button>
                </form>
            </div>
        </div>
    );
}