import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import GoogleMap from './GoogleMap'

import './css/horizontal.css';
import './css/theme-dark.css';

import { Carousel } from 'rsuite';
import ReactHtmlParser from 'react-html-parser';



export default function MainPageBody({info}) {

    let reactSwipeEl;

    const [restaurants, setRestlist] = useState([]);

    const getRestlist = async() =>{
        await fetch('https://restaraunt-lilac.vercel.app/cuisines')
            .then(response => response.json())
            .then(jsonData => setRestlist(jsonData))
            .catch(err => console.log(err));
            
    }
    useEffect(() => {
        getRestlist()
    },[]);

    let size = 4; //размер подмассива
    let subarray = []; //массив в который будет выведен результат.
    if (restaurants){
        for (let i = 0; i <Math.ceil(restaurants.length/size); i++){
            subarray[i] = restaurants.slice((i*size), (i*size) + size);
        }
    }


    function translit(word){
        var answer = '';
        var converter = {
            'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
            'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
            'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
            'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
            'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
            'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
            'э': 'e',    'ю': 'yu',   'я': 'ya',   'і': 'i',    'ї': 'y',
        
        ' ': "-", '"': '', '«': '', '»': '',   'є': 'e',    'Є': 'E',
     
            'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
            'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
            'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
            'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
            'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
            'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
            'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya',   'І' : 'I',    'Ї': 'Y',
        };
     
        for (var i = 0; i < word.length; ++i ) {
            if (converter[word[i]] === undefined){
                answer += word[i];
            } else {
                answer += converter[word[i]];
            }
        }
        return answer;
    }

    
    return (
        <main>
            <div 
                className="first-block-bg"
                style={{background: `url(/pics/${info.frst_bg}) 50% 50% fixed`}}
            >
                <div 
                    className="first-block"
                >
                    <p className="first-block-title">{info.name}</p>
                    <p className="first-block-description">{info.frst_text}</p>
                </div>
            </div>
            
            <div className="main-block" id="restaurants">
                <p className="main-block-title" >Наші ресторани</p>
                <Carousel className="custom-slider" shape='dot'>
                    {subarray.map((restaurant, index) => (
                        <Grid key={index} container justify="center">
                                {restaurant.map((rest, index) => (
                                <Grid 
                                    key={index}
                                    item 
                                    xs={6} md={12/restaurant.length}
                                    className="restaurant-block" 
                                    style={{backgroundImage: `url(/pics/${rest.first_bg}) `}}
                                >
                                    <div className="cover">
                                        <div className="restaurant-block-content">
                                            <p>{rest.cuisine_name}</p>
                                            <a href={`/${translit(rest.cuisine_name)}`} className="restaurant-block-button">Перейти</a>
                                        </div>
                                    </div>
                                </Grid>
                                ))}
                        </Grid>
                    ))}
                </Carousel>
            </div>

            <div 
                className="first-block-bg"
                style={{background: `url(/pics/${info.scnd_bg}) 50% 50% fixed`}}
            >
                <div 
                    className="quote"
                >
                    <p>
                        {info.frst_quote.split(/(?=[©])/)[0]} 
                    </p>
                        <span className='author'>{info.frst_quote.split(/(?=[©])/)[1]}</span>
                </div>
            </div>


            <div className="info" id="info">
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <div 
                            className="info-bg"
                            style={
                                {background: `url(/pics/${info.image}) 50% 50% no-repeat`,
                                backgroundSize: 'cover'
                            }}
                        >
                            {/* Info Image */}
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <div className="info-description">
                            <h3 style={{textAlign: 'center'}}>Інформація</h3>
                            {ReactHtmlParser(info.scnd_text)}
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="contacts" id="contacts">
                <Grid container>
                    <Grid item xs={12} md={6} >
                        <div className="contacts-description">
                            <h3 style={{textAlign: 'center'}}>Адреса</h3>
                            {
                                info.adress.split(/\s*,\s*/).map((item, index) => (
                                    <p key={index}>
                                        {item}
                                    </p>
                                ))
                            }
                            <br/>
                            <h3 style={{textAlign: 'center'}}>Контактні данні</h3>
                            {
                                info.contacts.split(/\s*,\s*/).map((item, index) => (
                                    <p key={index}>
                                        {item}
                                    </p>
                                ))
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}  className="google-map" >
                        {/* <img src={iblock} alt='info-photo'/> */}
                        <GoogleMap/>
                    </Grid>
                </Grid>
            </div>
            <div 
                className="first-block-bg"
                style={{background: `url(/pics/${info.scnd_bg}) 50% 50% fixed`}}
            >
                <div 
                    className="quote"
                >
                    <p>
                        {info.scnd_quote.split(/(?=[©])/)[0]} 
                    </p>
                        <span className='author'>{info.scnd_quote.split(/(?=[©])/)[1]}</span>
                </div>
            </div>
        </main>
    );
}