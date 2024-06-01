import React, { Fragment, useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import axios from "axios";
import { toast } from "react-toastify";


export default function WorkWithRestaurants(){
    
    const [newRest, setNewRest] = useState({
        cuisine_name: '',
        logo: ''
    })
    const [logoFile, setLogoFile] = useState()
    const [restaurant, setRest] = useState([]);
    const getRest = async() =>{
        await fetch(`https://restaraunt-lilac.vercel.app/cuisines`)
            .then(response => response.json())
            .then(jsonData => setRest(jsonData))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getRest()
    },[]);

    const onChange = e => {
        if(e.target.name === 'logo'){
            setNewRest({...newRest, [e.target.name] :  e.target.files[0].name })
            setLogoFile(e.target.files[0])
        } else{
            setNewRest({...newRest, [e.target.name] : e.target.value })
        }
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

    const onCreate = async () => {
        try {
            const { cuisine_name, logo } = newRest;
            const body = { cuisine_name, logo }
            const response = await fetch('https://restaraunt-lilac.vercel.app/cuisines', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            uploadFile(logoFile, logo)
            toast.success('Добавлено')
            getRest()
        } catch (err) {
            console.error(err.message)
        }
    }

    const deleteRest = async(id) =>{
        if (window.confirm('Видалити категорію?'))
        try {
            const response = await fetch(`https://restaraunt-lilac.vercel.app/cuisines/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'}
            })
            getRest();
            toast.success('Видалено')
        } catch (err) {
            console.error(err.message)
        }
    } 
    return(
        <Fragment>
            <Tabs defaultTab="vertical-tab-one" vertical>
                <TabList>
                    <Tab tabFor="vertical-tab-one">Створити новий ресторан</Tab>
                    <Tab tabFor="vertical-tab-two">Список усіх ресторанів</Tab>
                </TabList>
                <TabPanel tabId="vertical-tab-one">
                    <div className = "form-group">
                        <label for="exampleInputEmail1">Назва ресторану</label>
                        <input 
                            name='cuisine_name'
                            value ={newRest.cuisine_name} 
                            className = "form-control" 
                            placeholder="Назва ресторану"
                            onChange = {e => onChange(e)}
                        />
                    </div>
                    <label for="exampleInputEmail1">Логотип</label>
                    <table>
                        <tr>
                            <td>
                                <div className = "custom-file">
                                    <input 
                                        name="logo"
                                        type="file" 
                                        className = "custom-file-input" 
                                        onChange = {e => onChange(e)}
                                    />
                                    <label className = "custom-file-label" for="inputGroupFile01">Choose file</label>
                                </div>
                            </td>
                            <td>    &emsp;&emsp;   </td>
                            <td>
                                {newRest.logo}
                            </td>
                        </tr>
                    </table><br/>
                    
                    <button className = 'btn btn-success' onClick = {onCreate}>Додати</button>
                </TabPanel>
                <TabPanel tabId="vertical-tab-two">
                    <table className = "table table-color">

                    {
                        restaurant.length ?
                            restaurant.map((item, index) => (
                                <tr key = {index}>
                                    <td>
                                        {item.cuisine_name}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteRest(item.cuisine_id)}>Видалити</button>
                                    </td>
                                </tr>
                            ))
                        : ''
                    }
                    </table>
                </TabPanel>
            </Tabs>
        </Fragment>
    )
}