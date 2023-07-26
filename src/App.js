
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';
import { createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer/UseReducer';


export const UserContext = createContext();

const Routing = ()=>{
  return(
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path = "/contact" element={<Contact/>}/>
      <Route path = "/about" element={<About/>}/>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/signup" element={<Signup/>}/>
      <Route path = "/logout" element={<Logout/>}/>
      <Route path='/*' element={<Errorpage/>}/>
      </Routes>
  )
 }

function App() {

  const [state,dispatch] = useReducer(reducer,initialState )

  return (

    <div className="App">

      <UserContext.Provider value={{state,dispatch}}>
     
      <Navbar/>
      <Routing/>
      
      </UserContext.Provider>
    </div> 
  );
}

export default App;
