import React, { Fragment, useState, } from 'react';
import { toast } from "react-toastify";


export default function Registration() {

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
                "https://restaraunt-lilac.vercel.app/auth/registration",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();

            // toast.success("User created successfully")
            if(parseRes.token){
                // localStorage.setItem("token", parseRes.token)
                toast.success("User created successfully")
            }
            else{
                toast.error("User exist")
            }
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <Fragment>
                <h1 className="text-center">Регістрація нового користувача</h1>
                <form>
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
                    <button className="btn btn-success btn-block" onClick={onSubmitForm}>Submit</button>
                </form>
        </Fragment>
    );
}