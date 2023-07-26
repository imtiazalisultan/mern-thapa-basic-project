import React,{useContext, useState} from 'react';
import {useNavigate, NavLink} from "react-router-dom"; 
import { UserContext } from '../App';

const Login = () => {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {state, dispatch} = useContext(UserContext);


  const navigate = useNavigate();

  const loginSubmit = async(e) =>{

    e.preventDefault();

    const res = await fetch('/signin',{
      method:"POST",
      headers:{
        "Content-Type":"Application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    });
    // console.log(res);
    const data = await res.json();
   // console.log(data);

    if(res.status === 422 || !data){
      window.alert("Invalid Credential");
    }else{
      dispatch({type:'USER',payload:true});
      window.alert('Login Successfull');
      navigate('/');
    }
  }

  return (
    <>
       <div className='loginForm'>
      <h1 style={{color:'olive'}}>LOGIN PAGE</h1>
      <form method='POST' onSubmit={loginSubmit}>
        <div className="form-group">
            <label htmlFor='email'>
            <i className="zmdi zmdi-email material-icons-name"></i>
            </label>
            <input type="email" name="name" autocomplete="off" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
        </div>
        <div className="form-group">
            <label htmlFor='password'>
            <i className="zmdi zmdi-lock material-icons-name"></i>
            </label>
            <input type="password" name="name" autocomplete="off" placeholder=" Password"  value={password} onChange={(e)=>setPassword(e.target.value)} /><br/><br/>
        </div>
        <div className='form-group form-button'>
            <input style={{color:'green'}} type="submit" name="signin" value="LOGIN" /> <br/><br/>
        </div>
      </form>
      <div>
            <NavLink to="/signup">Create An Account</NavLink>
      </div>
      </div>
    </>
  )
}

export default Login
