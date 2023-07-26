import React, {useState} from 'react'
import {NavLink, useNavigate} from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({ name:"", email:"", phone:"", work:"", password:"",cpassword:""}) 

   
    const handleInput =(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        // console.log(name+" "+ value);
        // console.log([name]);-->['name'] or['email'] or['phone']etc
        setUser({...user,[name]:value})
    }


    const handleSubmit =async(e) =>{
        e.preventDefault();
        const {name, email, phone, work, password, cpassword} = user;

        const res = await fetch('/register',{
            method:"POST", 
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name, email, phone, work, password, cpassword
            })

        });
        const data = await res.json();

        if(res.status === 422 || !data){
            window.alert("Invalid Registration");
            //console.log("Invalid Registration");
        }else{
            window.alert("Registration Successfull");
           // console.log("Successfull Registration");
            navigate('/login');
        }
    }

  return (
    <>
    <div className='signupForm'>
      <h2 style={{color:'green'}}>SIGNUP PAGE</h2><br/><br/>
       <form method='POST'>
        <div className="form-group">
            <label htmlFor='name'>
            <i className="zmdi zmdi-account material-icons-name"></i>
            </label>
            <input type="text" name="name" autocomplete="off" placeholder="Your Name" onChange={handleInput} /><br/><br/>
        </div>
        <div className="form-group">
            <label htmlFor='email'>
            <i className="zmdi zmdi-email material-icons-name"></i>
            </label>
            <input type="email" name="email" autocomplete="off" placeholder="Your Email" onChange={handleInput} /><br/><br/>
        </div>
        <div className="form-group">
            <label htmlFor='phone'>
            <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
            </label>
            <input type="number" name="phone" autocomplete="off" placeholder="Your Phone" onChange={handleInput}/><br/><br/>
        </div>
        <div className="form-group">
            <label htmlFor='work'>
            <i className="zmdi zmdi-slideshow material-icons-name"></i>
            </label>
            <input type="text" name="work" autocomplete="off" placeholder="Your Profession" onChange={handleInput} /><br/><br/>
        </div>
        <div className="form-group">
            <label htmlFor='password'>
            <i className="zmdi zmdi-lock material-icons-name"></i>
            </label>
            <input type="password" name="password" autocomplete="off" placeholder="Set Password" onChange={handleInput}/><br/><br/>
        </div>
        <div className="form-group">
            <label htmlFor='cpassword'>
            <i className="zmdi zmdi-account material-icons-name"></i>
            </label>
            <input type="password" name="cpassword" autocomplete="off" placeholder="Set confirm password" onChange={handleInput}/><br/><br/>
        </div>
        <div className='form-group form-button'>
            <input type="submit" name="signup" value="REGISTER" onClick={handleSubmit} style={{color:'green'}}/> <br/><br/>
        </div>
        </form> 
        <div>
            <NavLink to="/login">I Am Already Registered</NavLink>
        </div>
        </div>
    </>
  )
}

export default Signup
