import React, { Fragment, useState, useEffect } from 'react'
import axios from "axios";
import { toast } from "react-toastify";




export default function UpdatePhotos({choosedRest}){
    const [restaurant, setRestaurant] = useState([]);

    const getRestaurantInfo = async() =>{
        await fetch(`http://localhost:5000/cuisines/${choosedRest}`)
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
    const [file4, setFile4] = useState();
    const [file5, setFile5] = useState();
    const [fileName, setFileName] = useState("");

    const onChange = (e) => {
        setRestaurant({...restaurant, [e.target.name] : e.target.files[0].name });
        if(e.target.name === 'first_bg') setFile1(e.target.files[0]);
        if(e.target.name === 'image') setFile2(e.target.files[0]);
        if(e.target.name === 'image2') setFile3(e.target.files[0]);
        if(e.target.name === 'image3') setFile4(e.target.files[0]);
        if(e.target.name === 'second_bg') setFile5(e.target.files[0]);
    }

    const uploadFile = async (file, fileName) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:5000/upload",
                formData
            );
        } catch (err) {
            console.log(err);
        }
    };

    const updateRestaurantInfo = async () => {
        try {
            const {cuisine_name, description, first_bg, hours, image, logo, second_bg, image2, image3 } = restaurant

            uploadFile(file1, first_bg)
            uploadFile(file2, image)
            uploadFile(file3, image2)
            uploadFile(file4, image3)
            uploadFile(file5, second_bg)
            const body = { cuisine_name, description, first_bg, hours, image, logo, second_bg, image2, image3 };
            const response = await fetch(`http://localhost:5000/cuisines/${choosedRest}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
            console.log(body)
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
                                    name="first_bg"
                                    type="file" 
                                    className="custom-file-input"
                                    onChange = {e => onChange(e)}
                                />
                                <label className="custom-file-label" >Choose file</label>
                            </div>
                        </div>
                        
                    </td>
                    <td>
                        {restaurant.first_bg}
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Перше зображення опису ресторану (якщо не обрано, то береться фонове зображення)</label>
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
                                <label className = "custom-file-label">Choose file</label>
                            </div>
                        </div>
                    </td>
                    <td>
                        {restaurant.image}
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Друге зображення опису ресторану (якщо не обрано, то береться фонове зображення)</label>
                    </td>
                    <td>
                        <div className="form-group">
                            <div className="custom-file">
                                <input 
                                    name="image2"
                                    type="file" 
                                    className="custom-file-input"
                                    onChange = {e => onChange(e)}
                                />
                                <label className = "custom-file-label">Choose file</label>
                            </div>
                        </div>
                    </td>
                    <td>
                        {restaurant.image2}
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Трете зображення опису ресторану (якщо не обрано, то береться фонове зображення)</label>
                    </td>
                    <td>
                        <div className="form-group">
                            <div className="custom-file">
                                <input 
                                    name="image3"
                                    type="file" 
                                    className="custom-file-input"
                                    onChange = {e => onChange(e)}
                                />
                                <label className = "custom-file-label">Choose file</label>
                            </div>
                        </div>
                    </td>
                    <td>
                        {restaurant.image3}
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
                                    name="second_bg"
                                    type="file" 
                                    className="custom-file-input"
                                    onChange = {e => onChange(e)}
                                />
                                <label className="custom-file-label">Choose file</label>
                            </div>
                        </div>
                    </td>
                    <td>
                        {restaurant.second_bg}
                    </td>
                </tr>
            </tbody>
        </table>
            
            <button className="btn btn-success float-right" onClick={updateRestaurantInfo}>Оновити</button><br/>
            
            
            
        </Fragment>
    );
}