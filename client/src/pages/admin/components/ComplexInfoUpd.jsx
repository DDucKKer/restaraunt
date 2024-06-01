import React, { Fragment, useState, useEffect, useRef } from 'react';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from "react-toastify";
import axios from "axios";


export default function ComplexInfoUpd(){

    const [restaurant, setRestaurant] = useState([]);

    const getRestaurantInfo = async() =>{
        await fetch(`http://localhost:5000/complex`)
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
        const htmlFormData = new htmlFormData();
        htmlFormData.append("file", file);
        htmlFormData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:5000/upload",
                htmlFormData
            );
        } catch (err) {
            console.log(err);
        }
    };

    const editorRef = useRef(null);

    const log = () => {
        if (editorRef.current) {
            setRestaurant({...restaurant, scnd_text: editorRef.current.getContent() })
            updateRestaurantInfo(editorRef.current.getContent());
        }
    };
    const updateRestaurantInfo = async (scnd_text) => {
        try {
            const {name, logo, frst_text, frst_bg, scnd_bg, adress, contacts, hours, frst_quote, scnd_quote, telegram, instagram, facebook, image } = restaurant

            const body = { name, logo, frst_text, scnd_text, frst_bg, scnd_bg, adress, contacts, hours, frst_quote, scnd_quote, telegram, instagram, facebook, image };
            
            const response = await fetch(`http://localhost:5000/complex`, {
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
            toast.error("Помилка");
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
                    <label htmlFor="exampleInputEmail1">Назва ресторану</label>
                    <input 
                        name='name'
                        value ={restaurant.name} 
                        className = "form-control" 
                        placeholder="Назва ресторану"
                        onChange = {e => onChange(e)}
                    />
                </div>
                <div className = "form-group">
                    <label htmlFor="exampleInputEmail1">Текст головного блоку</label>
                    <textarea 
                        name='frst_text'
                        value ={restaurant.frst_text} 
                        className = "form-control" 
                        placeholder="Текст головного блоку"
                        onChange = {e => onChange(e)}
                    />
                </div>
                <div className = "form-group">
                    <label htmlFor="exampleInputEmail1">Логотип</label>
                    <table>
                        <td>
                            <div className = "custom-file">
                                <input 
                                    name="logo"
                                    type="file" 
                                    className = "custom-file-input" 
                                    onChange = {e => onChange(e)}
                                />
                                <label className = "custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
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
                    <label htmlFor="exampleInputEmail1">Перша цитата</label>
                    <input 
                        name='frst_quote'
                        value ={restaurant.frst_quote} 
                        className = "form-control" 
                        placeholder="Перша цитата"
                        onChange = {e => onChange(e)}
                    />
                </div>
                <div className = "form-group">
                    <label htmlFor="exampleInputEmail1">Друга цитата</label>
                    <input 
                        name='scnd_quote'
                        value ={restaurant.scnd_quote} 
                        className = "form-control" 
                        placeholder="Друга цитата"
                        onChange = {e => onChange(e)}
                    />
                </div>

                <div className = "form-group">
                    <label htmlFor="rest-hours">Часи роботи</label>
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
                    initialValue={restaurant.scnd_text}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | htmlFormatselect | ' +
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
                    <label htmlFor="exampleInputEmail1">Адреса</label>
                    <input 
                        name='adress'
                        value ={restaurant.adress} 
                        className = "form-control" 
                        placeholder="Адреса"
                        onChange = {e => onChange(e)}
                    />
                </div>
                <div className = "form-group">
                    <label htmlFor="exampleInputEmail1">Контактні дані</label>
                    <input 
                        name='contacts'
                        value ={restaurant.contacts} 
                        className = "form-control" 
                        placeholder="Контактні дані"
                        onChange = {e => onChange(e)}
                    />
                </div>
                <div className = "form-group">
                    <label htmlFor="exampleInputEmail1">Посилання на Instagram</label>
                    <input 
                        name='instagram'
                        value ={restaurant.instagram} 
                        className = "form-control" 
                        placeholder="Посилання на Instagram"
                        onChange = {e => onChange(e)}
                    />
                </div>
                <div className = "form-group">
                    <label htmlFor="exampleInputEmail1">Посилання на Telegram</label>
                    <input 
                        name='telegram'
                        value ={restaurant.telegram} 
                        className = "form-control" 
                        placeholder="Посилання на Telegram"
                        onChange = {e => onChange(e)}
                    />
                </div>
                <div className = "form-group">
                    <label htmlFor="exampleInputEmail1">Посилання на Facebook</label>
                    <input 
                        name='facebook'
                        value ={restaurant.facebook} 
                        className = "form-control" 
                        placeholder="Посилання на Facebook"
                        onChange = {e => onChange(e)}
                    />
                </div>

                <button className="btn btn-success" onClick={log}>Оновити інформацію</button>
            </TabPanel>
        </Tabs>
        </Fragment>
    )
}