import React, { Fragment, useState, useEffect } from 'react';
import { toast } from "react-toastify";

 

export default function EditMenuSection({choosedCategory, getSections, handleCloseSections}){

    const [section, setSection] = useState(choosedCategory)

    const { section_id, section_name, cuisine_id } = section;
    const onChange = e => {
        setSection({...section, [e.target.name] : e.target.value })
    }
    const updateSection = async () => {
        try {
            const body = { section_id, section_name, cuisine_id };
            const response = await fetch(`http://localhost:5000/sections/${section_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
            getSections()
            toast.success("Оновлено");
        } catch (error) {
            console.error(error.message)
        }
    }
    return(
        <div className = 'modal-body'>
            <h1>Оновлення даних</h1>
            <div class="form-group">
                <label>Змінити назву</label>
                <input 
                    name='section_name'
                    value ={section_name} 
                    class="form-control" 
                    placeholder="Назва категорії"
                    onChange = {e => onChange(e)}
                />
            </div>
            <button className="btn btn-success float-right" onClick={updateSection}>Оновити</button><br/><br/>
            <button className="btn btn-danger float-right" onClick={handleCloseSections}>Закрити</button><br/>
            
        </div>
    )
}