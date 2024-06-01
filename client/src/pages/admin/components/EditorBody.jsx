import React, { Fragment, useState, useEffect } from 'react';
// import { Grid } from '@material-ui/core';
// import { TabProvider, Tab, TabPanel, TabList, Tabs } from 'react-web-tabs';
// import 'react-web-tabs/dist/react-web-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import RestaurantInfoUpd from "./RestaurantInfoUpd"
import MenuInfo from './MenuInfo';
import Reservation from './Reservation';
import UpdatePhotos from './UpdatePhotos';
import ComplexInfoUpd from './ComplexInfoUpd';
import UpdateComplexPhotos from './UpdateComplexPhotos';
import WorkWithRestaurants from './WorkWithRestaurants';
import Registration from './Registration';


export default function ChooseRestaurant({choosedRest}){
    const [restaurant, setRestaurant] = useState([]);

    const getRestaurantInfo = async() =>{
        if (choosedRest === 'ORM'){
            await fetch(`https://restaraunt-lilac.vercel.app/complex`)
                .then(response => response.json())
                .then(jsonData => setRestaurant(jsonData))
                .catch(err => console.log(err));
        } else {
            await fetch(`https://restaraunt-lilac.vercel.app/cuisines/${choosedRest}`)
                .then(response => response.json())
                .then(jsonData => setRestaurant(jsonData))
                .catch(err => console.log(err));
        }
        console.log(restaurant)
    }
    useEffect(() => {
        getRestaurantInfo()
    },[]);

    return(
        <Fragment>
            <h2 className="text-center">Оберіть де змінити інформацію</h2>
            {
                (restaurant.length !== 0) ?
                
                <Tabs defaultTab="one">
                    <section className="my-tabs">
                        <TabList className="my-tablist">
                            <Tab tabFor="one">
                                {choosedRest === 'ORM' ?
                                    'Інформація про комплекс'
                                    : 
                                    'Інформація про Ресторан'}</Tab>
                            <Tab tabFor="two">Фотографії</Tab>
                            <Tab tabFor="three">
                                {choosedRest === 'ORM' ?
                                    'Ресторани'
                                    : 
                                    'Меню'}
                            </Tab>
                            {choosedRest === 'ORM' ?
                                <Tab tabFor="four">
                                    Новий користувач
                                </Tab>
                                : 
                                <Tab tabFor="four">
                                    Бронь
                                </Tab>
                            }
                        </TabList>
                        <div className="wrapper">
                            <TabPanel tabId="one">
                                {
                                    choosedRest === 'ORM' ?
                                        <ComplexInfoUpd/>
                                    : 
                                        <RestaurantInfoUpd 
                                            choosedRest = {choosedRest}
                                        />
                                }
                            </TabPanel>
                            <TabPanel tabId="two">
                                {
                                    choosedRest === 'ORM' ?
                                        <UpdateComplexPhotos/>
                                    : 
                                        <UpdatePhotos
                                            choosedRest = {choosedRest}
                                        />
                                }
                            </TabPanel>
                            <TabPanel tabId="three">
                                {
                                    choosedRest === 'ORM' ?
                                        <WorkWithRestaurants/>
                                    : 
                                        <MenuInfo
                                            choosedRest = {choosedRest}
                                        />
                                }
                            </TabPanel>
                            <TabPanel tabId="four">
                                {
                                    choosedRest === 'ORM' ?
                                        <Registration/>
                                    : 
                                        <Reservation
                                            choosedRest ={choosedRest}
                                        />
                                }
                            </TabPanel>
                        </div>
                    </section>
                </Tabs>
                : ''
            }
        </Fragment>
    )
}

function FileUploadPage(){
	
}
