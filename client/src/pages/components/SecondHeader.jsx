




const SecondHeader = ({rest}) => {
    return(
      <header id = 'header'>
        {rest.logo 
          ? 
            <img src={`/pics/${rest.logo}`} alt='logo' className="restlogo2"/> 
          : 
            <i><p className="restlogo2">{rest.cuisine_name}</p></i>
        }
        <label for="toggle-1" class="toggle-menu"><i class="toggle-icon"></i></label>
        <input type="checkbox" class="toggle-1" id="toggle-1"/>
        <div className="header-body">
          {rest.logo 
            ? 
              <img src={`/pics/${rest.logo}`} alt='logo' className="restlogo"/> 
            : 
              <i><p className="logo">{rest.cuisine_name}</p></i>
          }
          {/* <p>Кафе Латвійської кухні «De Lux»</p> */}
          {/* <img src={restlogo} alt='logo' className="logo"/> */}
          <div className="header-btns">
            <a href="/">Головна сторінка комплексу</a>
            <a href="#menu">Меню</a>
            <a href="#info">Інформація</a>
            <a href="#reservation" className="reservation-button">Резервування</a>
          </div>
        </div>
      </header>
    )
  }
  export default SecondHeader;