import React, { Fragment, useState, useEffect } from 'react';
import { toast } from "react-toastify";

 

export default function EditMenuSection({choosedDish, getDish, handleCloseDishes}){

    const [dish, setSection] = useState(choosedDish)
    const { name, description, weight, menu_id, section_id } = dish;
    const onChange = e => {
        setSection({...dish, [e.target.name] : e.target.value })
    }
    
    const updateDish = async () => {
        try {
            const body = { name, description, weight, menu_id, section_id };
            console.log(body, choosedDish)
            const response = await fetch(`http://localhost:5000/menu/${menu_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
            getDish()
            toast.success("Оновлено");
        } catch (error) {
            console.error(error.message)
        }
    }

    return(
        <div className = 'modal-body'>
            <h1>Оновлення даних</h1>
            <div class="form-group">
                <label for="exampleInputEmail1">Назва</label>
                <input 
                    name='name'
                    value ={name} 
                    class="form-control" 
                    placeholder="Назва"
                    onChange = {e => onChange(e)}
                />
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Опис</label>
                <input 
                    name='description'
                    value ={description} 
                    class="form-control" 
                    placeholder="Опис"
                    onChange = {e => onChange(e)}
                />
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Вага</label>
                <input 
                    name='weight'
                    value ={weight} 
                    class="form-control"
                    placeholder="Вага (Приклад: 120 г)"
                    onChange = {e => onChange(e)}
                />
            </div>
            <button className="btn btn-success float-right" onClick={updateDish}>Оновити</button><br/><br/><br/>
            <button className="btn btn-danger float-right" onClick={handleCloseDishes}>Закрити</button>
            
        </div>
    )
}