import React, {useState} from "react";
import InputMask from 'react-input-mask';
import { toast } from "react-toastify";



export default function Feedback({setShowFeedback}){
    const [client_name, setClName] = useState('');
    const [client_surname, setClSurname] = useState('');
    const [phone_number, setPhNum] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const onSubmitForm = async() => {
        // e.preventDefault();
        if(!client_name || !email) return toast.error("Вписані не всі дані з зірочкою*")
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) return toast.error("Неправильно вписана електронна пошта")
        
        try {
            const body = { client_name, client_surname, phone_number, email, message };
            const response = await fetch("https://restaraunt-lilac.vercel.app/feedback", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
            toast.success("Відправлено")
            setClName('')
            setClSurname('')
            setPhNum('')
            setEmail('')
            setMessage('')
            setShowFeedback(false)
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <div className= 'feedback-bg'>
            <div className ='feedback-body'>
                <div className="feedback-form">
                    <a className="close-form" onClick={() => setShowFeedback(false)}>X</a>
                    <h2 style={{textAlign: 'center', marginBottom:'15px'}}>Зворотній зв'язок</h2>
                    <label>Ім'я*</label>
                    <input name="name" value ={client_name} onChange={e => setClName(e.target.value)} placeholder="Ім'я"/>
                    
                    <label>Прізвище</label>
                    <input name="surname" value ={client_surname} onChange={e => setClSurname(e.target.value)} placeholder="Прізвище"/>
                        
                    
                    <label>Електронна пошта*</label>
                    <input name="email" value ={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                        
                    <label>Номер телефону</label>
                    <InputMask mask="+38(999)999-99-99" value ={phone_number} onChange={e => setPhNum(e.target.value)} ></InputMask>
                    
                    <label>Повідомлення</label>
                    <textarea type="number" value={message} onChange={e => setMessage(e.target.value)} placeholder="Повідомлення"/>
                    <button className="reservation-button-big" onClick={onSubmitForm} >Відправити</button>
                    
                </div>
            </div>
        </div>
    )
}