import React from 'react';
import Grid from '@mui/material/Grid';
import telegram from './pics/Telegram2.png'
import instagram from './pics/Insagram2.png'
import facebook from './pics/facebook2.png'

const Footer = ({restaurant}) => { 
    const contacts = [
        {
          name: 'facebook',
          img: facebook,
          link: restaurant.facebook,
        },
        {
          name: 'instagram',
          img: instagram,
          link: restaurant.instagram,
        },
        {
          name: 'telegram',
          img: telegram,
          link: restaurant.telegram,
        },
      ]
    return(
        <footer>
            <Grid container>
                <Grid container item xs={4} md={4}
                    justify="center"
                    alignItems="center"
                >
                        {contacts.map((cont, index) => (
                            <a href={cont.link} key={index}>
                            <img src={cont.img} className = "contact" alt={cont.name}/>
                            </a>
                        ))}

                </Grid>
                <Grid container item xs={4} md={4} 
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <a href="/#restaurants">Ресторани</a>
                    <a href="#info">Інформація</a>
                    <a href="#contacts">Контакти</a>
                    <a href="#">На початок сторінки</a>
                </Grid>
                <Grid container item xs={4} md={4} 
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <p  style={{fontWeight:'bold'}}>РЕЖИМ РОБОТИ</p>
                    <p>УСІ ДНІ</p>
                    <p>{restaurant.hours}</p>
                </Grid>
            </Grid>
        </footer>
    )
}
export default Footer;