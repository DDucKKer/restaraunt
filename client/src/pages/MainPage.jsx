import Footer from "./Footer";
import MainPageBody from "./MainPageBody";
import MainHeader from "./components/MainHeader";
import Feedback from "./Feedback";
import { useState, useEffect } from 'react';

const MainPage = ({info}) => {


    const [showFeedback, setShowFeedback] = useState(false)

    return(
      <>
        {info && <>
          <MainHeader info={info} setShowFeedback = {setShowFeedback}/>
          <MainPageBody info={info}/>
          <Footer restaurant = {info} setShowFeedback = {setShowFeedback}/>
          {
              showFeedback && <Feedback setShowFeedback = {setShowFeedback}/>
          }
        </>
        }

      </>
    )
  }
  export default MainPage;