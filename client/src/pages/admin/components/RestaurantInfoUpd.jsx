import React, { Fragment, useState, useEffect, useRef } from 'react';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import { Editor } from '@tinymce/tinymce-react';
import { toast } from "react-toastify";
import axios from "axios";



export default function RestaurantInfoUpd({choosedRest}){
    
    const [restaurant, setRestaurant] = useState([]);

    const getRestaurantInfo = async() =>{
        await fetch(`https://restaraunt-lilac.vercel.app/cuisines/${choosedRest}`)
            .then(response => response.json())
            .then(jsonData => setRestaurant(jsonData))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getRestaurantInfo()
    },[]);

    const [logoFile, setLogoFile] = useState()

    const onChange = e => {
        if(e.target.name === 'logo'){
            setRestaurant({...restaurant, [e.target.name] :  e.target.files[0].name })
            setLogoFile(e.target.files[0])
        } else{
            setRestaurant({...restaurant, [e.target.name] : e.target.value })
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

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            setRestaurant({...restaurant, description: editorRef.current.getContent() })
            updateRestaurantInfo(editorRef.current.getContent());
        }
        console.log(restaurant.quote)
    };

    const updateRestaurantInfo = async (description) => {
        try {
            const {cuisine_name, first_bg, hours, image, logo, second_bg, image2, image3, telegram, instagram, facebook, quote } = restaurant
            const body = { cuisine_name, description, first_bg, hours, image, logo, second_bg, image2, image3, telegram, instagram, facebook, quote };
            console.log(body)
            const response = await fetch(`https://restaraunt-lilac.vercel.app/cuisines/${choosedRest}`, {
                method: 'PUT', 
                body: JSON.stringify(body), 
                headers: {
                  'Content-Type': 'application/json'
                }
            });
            
            uploadFile(logoFile, logo)

            getRestaurantInfo()
            toast.success("Оновлено");
        } catch (error) {
            console.error(error.message)
        }
    }
    return(
        <Fragment>
            
            <Tabs defaultTab="vertical-tab-one" vertical>
                <TabList>
                    <Tab tabFor="vertical-tab-one">Основна інформація</Tab>
                    <Tab tabFor="vertical-tab-two">Опис</Tab>
                    <Tab tabFor="vertical-tab-three">Контакти</Tab>
                </TabList>
                <TabPanel tabId="vertical-tab-one">
                    <div className = "form-group">
                        <label for="exampleInputEmail1">Назва ресторану</label>
                        <input 
                            name='cuisine_name'
                            value ={restaurant.cuisine_name} 
                            className = "form-control" 
                            placeholder="Назва ресторану"
                            onChange = {e => onChange(e)}
                        />
                    </div>
                    <div className = "form-group">
                        <label for="exampleInputEmail1">Логотип</label>
                        <table>
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
                                {restaurant.logo}
                            </td>
                            <td>    &emsp;&emsp;   </td>
                            <td>    <img src={`/src/pages/pics/${restaurant.logo}`} alt='logo' className="restlogo-admin"/>   </td>
                        </table>
                    </div>

                    <div className = "form-group">
                        <label for="rest-hours">Цитата або лозунг на сторінці ресторану</label>
                        <input 
                            name='quote'
                            value ={restaurant.quote} 
                            className = "form-control"
                            aria-describedby="basic-addon3" 
                            placeholder="Цитата або лозунг"
                            onChange = {e => onChange(e)}
                        />
                    </div>

                    <div className = "form-group">
                        <label for="rest-hours">Часи роботи</label>
                        <input 
                            name='hours'
                            value ={restaurant.hours} 
                            className = "form-control"
                            aria-describedby="basic-addon3" 
                            placeholder="Часи роботи"
                            onChange = {e => onChange(e)}
                        />
                    </div>
                    
                    <button className="btn btn-success" onClick={log}>Оновити інформацію</button>
                    
                </TabPanel>
                <TabPanel tabId="vertical-tab-two">
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={restaurant.description}
                        init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                        content_style: 'body { font-family: Montserrat, Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    <button className="btn btn-success" onClick={log}>Оновити інформацію</button>
                </TabPanel>
                <TabPanel tabId="vertical-tab-three">
                    <div className = "form-group">
                        <div className = "form-group">
                            <label for="exampleInputEmail1">Посилання на Instagram</label>
                            <input 
                                name='instagram'
                                value ={restaurant.instagram} 
                                className = "form-control" 
                                placeholder="Посилання на Instagram"
                                onChange = {e => onChange(e)}
                            />
                        </div>
                        <div className = "form-group">
                            <label for="exampleInputEmail1">Посилання на Telegram</label>
                            <input 
                                name='telegram'
                                value ={restaurant.telegram} 
                                className = "form-control" 
                                placeholder="Посилання на Telegram"
                                onChange = {e => onChange(e)}
                            />
                        </div>
                        <div className = "form-group">
                            <label for="exampleInputEmail1">Посилання на Facebook</label>
                            <input 
                                name='facebook'
                                value ={restaurant.facebook} 
                                className = "form-control" 
                                placeholder="Посилання на Facebook"
                                onChange = {e => onChange(e)}
                            />
                        </div>

                        <button className="btn btn-success" onClick={log}>Оновити інформацію</button>
                    </div>
                </TabPanel>
            </Tabs>
        </Fragment>
    )
}