import { useState, useEffect } from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import RestaurantPage from './pages/RestaurantPage'; 
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import Admin from './pages/admin/Admin';
import Login from './pages/admin/Login';


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


function App() {
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
  

  const [info, setInfo] = useState([]);

  const getInfo = async() =>{
      await fetch('https://restaraunt-lilac.vercel.app/mainifo')
          .then(response => response.json())
          .then(jsonData => setInfo(jsonData))
          .catch(err => console.log(err));
          
  }
  useEffect(() => {
      getInfo()
  },[]); 


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
 
  const isAuth = async () => {
    try {
      const res = await fetch("https://restaraunt-lilac.vercel.app/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();

      (parseRes === true) ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);


  return (
    <div className="App">
    <Router>
      <Routes>
        {
          info.length &&
            <Route path="/" element={
              <MainPage info={info[0]}/>
            }/>

        }
        {
          restaurants.map((item, index) => (
            <Route path={translit(item.cuisine_name)} key={index} element={
              <RestaurantPage restaurant={item}/>
            }/>
          ))
        }
        <Route path="adminpanel" 
          element = { 
            isAuthenticated ? (
              <Admin setAuth={setAuth} />
            ) : ( 
              <Navigate to = "/admin" />
            )
          } />
        <Route path="admin" 
          element = {
            !isAuthenticated ? (
              <Login setAuth={setAuth} info = {info}  />
            ) : ( 
              <Navigate to = "/adminpanel" />
            )
          } 
        />
      </Routes>
    </Router>  
    </div>
  );
}
 
export default App;
