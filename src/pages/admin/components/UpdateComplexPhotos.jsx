import React, { Fragment, useState, useEffect } from 'react'
import axios from "axios";
import { toast } from "react-toastify";




export default function UpdatePhotos(){
    const [restaurant, setRestaurant] = useState([]);

    const getRestaurantInfo = async() =>{
        await fetch(`https://restaraunt-lilac.vercel.app/complex`)
            .then(response => response.json())
            .then(jsonData => setRestaurant(jsonData))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getRestaurantInfo()
    },[]);

    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();
    const [file3, setFile3] = useState();

    const onChange = (e) => {
        setRestaurant({...restaurant, [e.target.name] : e.target.files[0].name });
        if(e.target.name === 'frst_bg') setFile1(e.target.files[0]);
        if(e.target.name === 'scnd_bg') setFile2(e.target.files[0]);
        if(e.target.name === 'image') setFile3(e.target.files[0]);
    }

    const uploadFile = async (file, fileName) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "https://restaraunt-lilac.vercel.app/upload",
                formData
            );
        } catch (err) {
            console.log(err);
        }
    };

    const updateRestaurantInfo = async () => {
        try {
            const {name, logo, frst_text, scnd_text, frst_bg, scnd_bg, adress, contacts, hours, frst_quote, scnd_quote, telegram, instagram, facebook, image } = restaurant


            uploadFile(file1, frst_bg)
            uploadFile(file2, scnd_bg)
            uploadFile(file3, image)
            
            const body = { name, logo, frst_text, scnd_text, frst_bg, scnd_bg, adress, contacts, hours, frst_quote, scnd_quote, telegram, instagram, facebook, image };
            console.log(body)
            const response = await fetch(`https://restaraunt-lilac.vercel.app/complex`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });

            getRestaurantInfo()
            toast.success("Оновлено");
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <Fragment>
        <table className= 'table table-secondary'>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Обране</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <label>Фонове зображення</label>
                    </td>
                    <td>
                        <div className="form-group">
                            <div className="custom-file">
                                <input 
                                    name="frst_bg"
                                    type="file" 
                                    className="custom-file-input"
                                    onChange = {e => onChange(e)}
                                />
                                <label className="custom-file-label" >Choose file</label>
                            </div>
                        </div>
                        
                    </td>
                    <td>
                        {restaurant.frst_bg}
                    </td>
                </tr>
                
                <tr>
                    <td>
                        <label>Фон цитати (якщо не обрано, то береться фонове зображення)</label>
                    </td>
                    <td>
                        <div className="form-group">
                            <div className="custom-file">
                                <input 
                                    name="scnd_bg"
                                    type="file" 
                                    className="custom-file-input"
                                    onChange = {e => onChange(e)}
                                />
                                <label className="custom-file-label">Choose file</label>
                            </div>
                        </div>
                    </td>
                    <td>
                        {restaurant.scnd_bg}
                    </td>
                </tr>
                
                <tr>
                    <td>
                        <label>Фотографія опису (якщо не обрано, то береться фонове зображення цитати)</label>
                    </td>
                    <td>
                        <div className="form-group">
                            <div className="custom-file">
                                <input 
                                    name="image"
                                    type="file" 
                                    className="custom-file-input"
                                    onChange = {e => onChange(e)}
                                />
                                <label className="custom-file-label">Choose file</label>
                            </div>
                        </div>
                    </td>
                    <td>
                        {restaurant.image}
                    </td>
                </tr>
            </tbody>
        </table>
            
            <button className="btn btn-success float-right" onClick={updateRestaurantInfo}>Оновити</button><br/>
            
            
            
        </Fragment>
    );
}