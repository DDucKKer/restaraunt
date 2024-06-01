import React, { Fragment, useState, useEffect } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { toast } from "react-toastify";

import EditMenuSection from './EditMenu/EditMenuSection'
import EditMenu from './EditMenu/EditMenu'


export default function MenuInfo({choosedRest}){
    let cuisine_id = choosedRest;

    const [section_name, setSectionName] = useState('')
    const addSection = async () =>{
        if(section_name){
            try {
                const body = { section_name, cuisine_id };
                await fetch("http://localhost:5000/sections", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
                });
                toast.success("Добавлено");
                setSectionName('')
                getSections();
            } catch (err) {
                console.error(err.message)
            }
        } else{
            toast.error("Введите название");
        }
    }
    const [sections, setSections] = useState([])
    const getSections = async() =>{
        await fetch(`http://localhost:5000/sections/cuisine/${choosedRest}`)
            .then(response => response.json())
            .then(jsonData => setSections(jsonData))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getSections()
    },[]);
    const deleteCategory = async (id) => {
        if (window.confirm('Видалити категорію?'))
        try {
            await fetch (`http://localhost:5000/sections/${id}`,{
                method: 'DELETE'
            })
            getSections();
        } catch (error) {
            console.log(error)
        }
    }

    const [newDish, setNewDish] = useState({
        section_id: '',
        name: '',
        description: '',
        weight: ''
    })
    const { section_id, name, description, weight } = newDish;
    const onChange = e => {
        setNewDish({...newDish, [e.target.name] : e.target.value })
    }
    const addDish = async () => {
        try {
            if (section_id === '-10' || !section_id.length || !name.length || !description.length || !weight.length ) return toast.error("Щось обрано не так");
            const body = { section_id, name, description, weight, cuisine_id };
            await fetch("http://localhost:5000/menu", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
            toast.success("Добавлено");
            setNewDish({
                section_id: '',
                name: '',
                description: '',
                weight: ''
            })
        } catch (err) {
            console.error(err.message)
        }
    }
    
    const [dishes, setDish] = useState([])
    const getDish = async() =>{
        await fetch(`http://localhost:5000/menu`)
            .then(response => response.json())
            .then(jsonData => setDish(jsonData))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getDish()
    },[]);

    const deleteDish = async (id) => {
        if (window.confirm('Видалити страву?'))
        try {
            await fetch (`http://localhost:5000/menu/${id}`,{
                method: 'DELETE'
            })
            getDish();
        } catch (error) {
            console.log(error)
        }
    }

    const [showSections, setShowSect] = useState(false);
    const [choosedCategory, setCategory] = useState([]);

    const handleCloseSections = () => {
        setCategory([])
        setShowSect(false)
    };
    const handleShowSections = async (id) => {
        await fetch(`http://localhost:5000/sections/${id}`)
            .then(response => response.json())
            .then(jsonData => setCategory(jsonData))
            .catch(err => console.log(err));
        setShowSect(true)
    };

    const [showDish, setShowDish] = useState(false);
    const [choosedDish, setChoosedDish] = useState([]);

    const handleCloseDishes = () => {
        setChoosedDish([])
        setShowDish(false)
    };
    const handleShowDishes = async (menu_id) => {
        await fetch(`http://localhost:5000/menu/section/${menu_id}`)
            .then(response => response.json())
            .then(jsonData => setChoosedDish(jsonData))
            .catch(err => console.error(err.message));
        setShowDish(true)
    };

    return(
        <Fragment>
            <Tabs defaultTab="vertical-tab-one" vertical>
                <TabList>
                    <Tab tabFor="vertical-tab-one">Категории меню</Tab>
                    <Tab tabFor="vertical-tab-two">Страви</Tab>
                </TabList>
                <TabPanel tabId="vertical-tab-one">
                    <div className = "form-group">
                        <label for="exampleInputEmail1">Нова категорія</label>
                        <input 
                            name='section_name'
                            value ={section_name} 
                            className = "form-control" 
                            placeholder="Назва категорії"
                            onChange = {e => setSectionName(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success float-right" onClick={addSection}>Додати</button><br/>
                    <details>
                        <summary className="menu-section-name">Список категорій</summary>
                        <table className ="table table-hover table-secondary">
                            <tbody>
                                {
                                    sections.map((item, index) => (
                                        <tr key ={index}>
                                            <td>{item.section_name}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-warning" 
                                                    onClick={()=>handleShowSections(item.section_id)}
                                                >
                                                    Змінити
                                                </button>
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-danger"
                                                    onClick={() => deleteCategory(item.section_id)}
                                                >
                                                    Видалити
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </details>
                </TabPanel>
                <TabPanel tabId="vertical-tab-two">
                    <Tabs defaultTab="basic-tab-one">
                        <TabList>
                            <Tab tabFor="basic-tab-one">Додати нову страву</Tab>
                            <Tab tabFor="basic-tab-two">Список страв</Tab>
                        </TabList>
                        <TabPanel tabId="basic-tab-one">
                            <div className = "form-group">
                                <label for="exampleInputEmail1">Назва</label>
                                <input 
                                    name='name'
                                    value ={name} 
                                    className = "form-control" 
                                    placeholder="Назва"
                                    onChange = {e => onChange(e)}
                                />
                            </div>
                            <div className = "form-group">
                                <label for="exampleFormControlSelect1">Категория</label>
                                <select 
                                    name="section_id" 
                                    className = "form-control"
                                    onChange = {e => onChange(e)}
                                >
                                    <option value='-10'>
                                    </option>
                                    {
                                        sections.map((item, index) => (
                                            <option key={index} value={item.section_id}>
                                                {item.section_name}
                                            </option>
                                        ))
                                    } 
                                </select>
                            </div>
                            <div className = "form-group">
                                <label for="exampleInputEmail1">Опис</label>
                                <input 
                                    name='description'
                                    value ={description} 
                                    className = "form-control" 
                                    placeholder="Опис"
                                    onChange = {e => onChange(e)}
                                />
                            </div>
                            <div className = "form-group">
                                <label for="exampleInputEmail1">Вага</label>
                                <input 
                                    name='weight'
                                    value ={weight} 
                                    className = "form-control"
                                    placeholder="Вага (Приклад: 120 г)"
                                    onChange = {e => onChange(e)}
                                />
                            </div>
                            <button className="btn btn-success float-right" onClick={addDish}>Додати</button><br/>
                            
                        </TabPanel>
                        <TabPanel tabId="basic-tab-two">
                        {(sections.length && dishes.length) ? sections.map((sec, index) => {
                        
                        const sectdish = [];
                        for(let i = 0; i < dishes.length; i++){
                            if(dishes[i].section_id === sec.section_id)  sectdish.push(dishes[i])
                        }
                        return(
                        <details key = {index}>
                            <summary className="menu-section-name"> {sec.section_name}</summary>
                            <table className="table table-secondary">
                                <tbody>
                                    {(sectdish.length) ? sectdish.map((dish, index) => (
                                        <tr key ={index}>
                                            <td>{dish.name}</td>
                                            <td>{dish.description}</td>
                                            <td>{dish.weight}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-warning" 
                                                    onClick = {() => handleShowDishes(dish.menu_id)}
                                                >
                                                    Змінити
                                                </button>
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-danger"
                                                    onClick={() => deleteDish(dish.menu_id)}
                                                >
                                                    Видалити
                                                </button>
                                            </td>
                                        </tr>
                                    )) : ''}  

                                </tbody>
                            </table>                          
                        </details>
                    )}) : ''}
                        </TabPanel>
                    </Tabs>
                </TabPanel>
            </Tabs>
            
            { showSections ? <div className="modal"><EditMenuSection choosedCategory = {choosedCategory} getSections={getSections} handleCloseSections = {handleCloseSections} /></div> : ''}
            { showDish ? <div className="modal"><EditMenu choosedDish = {choosedDish} getDish={getDish} handleCloseDishes = {handleCloseDishes} /></div> : ''}
        </Fragment>
    )
}
