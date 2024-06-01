import React, { Fragment} from 'react';
import Grid from '@mui/material/Grid';




export default function ChooseRestaurant({restaurants, setRest}){
    
    return(
        <Fragment>
            <h2 className="text-center">Оберіть де змінити інформацію</h2>
            <Grid container justify="center">
                <div
                    className="admin-restaurants"
                    style={{backgroundImage: `url(/src/pages/pics/fblock.jpg) `}}
                >
                    <a href="#" onClick={()=> setRest('ORM')}>Odessa restaurants market</a>
                </div>
            {
                (restaurants.length) ?
                restaurants.map((item, index) => (
                    <div key = {index} 
                        className="admin-restaurants"
                        style={{backgroundImage: `url(/src/pages/pics/${item.first_bg}) `}}
                    >
                        <a href="#" onClick={()=> setRest(item.cuisine_id)}>{item.cuisine_name}</a>
                    </div>
                )) 
                : ''
            }
            </Grid>
        </Fragment>
    )
}