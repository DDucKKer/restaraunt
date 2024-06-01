import Footer from "./Footer";
import RestaurantPageBody from "./RestaurantPageBody";
import SecondHeader from "./components/SecondHeader";


const RestaurantPage = ({restaurant}) => {



    return(
      <>
        <SecondHeader rest ={restaurant}/>
        <RestaurantPageBody restId={restaurant.cuisine_id}/>
        <Footer restaurant = {restaurant}/>
      
      </>
    )
  }
  export default RestaurantPage;