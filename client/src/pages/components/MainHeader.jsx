const MainHeader = ({info, setShowFeedback}) => {



    return(
      <header>
        {info && <img src={`src/pages/pics/${info.logo}`} alt='logo2' className="logo2"/>}
        <label htmlFor="toggle-1" className="toggle-menu"><i className="toggle-icon"></i></label>
        <input type="checkbox" className="toggle-1" id="toggle-1"/>
        <div className="header-body">
          <a className="menu-item" href="#restaurants">Ресторани</a>
          <a className="menu-item" href="#info">Інформація</a>
          <img src={`src/pages/pics/${info.logo}`} alt='logo' className="logo"/>
          <a className="menu-item" href="#contacts">Контакти</a>
          <a className="menu-item" href="#" onClick={() => setShowFeedback(true)}>Зворотній зв'язок</a>
        </div>
      </header>
    )
  }
  export default MainHeader;