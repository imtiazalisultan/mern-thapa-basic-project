import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';

const About = () => {


    const navigate = useNavigate();

    const[userData, setUserData] = useState({});

    const callAboutPage = async() =>{
        try{
            const res = await fetch('/about',{
                method:"GET",
                headers:{
                    Accept: "application/json",  // this Accept : is required to save the Cookie in our browser
                    "Content-Type": "application/json"
                },
                credentials: "include"  // this Credential is required to send the cookie to Backend or frontend
                //We are writing this ......so that the cookies will get back properly to the backened~~cookies se data send karna hai backend ko isliye likna IMPORtant hai else; wo data nai jaynega
                
            });
            const data = await res.json();
            //  console.log(data);
             setUserData(data);

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error; 
            }

        }catch(err){
            console.log(err);
            navigate('/login');
        }
    }

   useEffect(()=>{
        callAboutPage();
   },[]);

//console.log(userData);
  return (
    <>
     <div className='aboutPage'>
      
      <form method='GET'>

      <div>
        <h2>{userData.name}</h2>
        <h6>{userData.work}</h6>
    
        <div id="home" role="tabpanel">
            <div>
                <label>User ID:</label>
                <p>{userData._id}</p>
            </div>
            <div>
                <label>Name:</label>
                <p>{userData.name}</p>
            </div>
            <div>
                <label>Email:</label>
                <p>{userData.email}</p>
            </div>
            <div>
                <label>Phone:</label>
                <p>{userData.phone}</p>
            </div>
            <div>
                <label>profession:</label>
                <p>{userData.work}</p>
            </div>
        </div>
        <div id="profile" role="tabpanel">
             <div>
                <label>Experience</label>
                <p>Intermediate</p>
            </div>
            <div>
                <label>Hourly Rate</label>
                <p>10$/hr</p>
            </div>
            <div>
                <label>Total Project</label>
                <p>230</p>
            </div>
            <div>
                <label>profession</label>
                <p>{userData.work}</p>
            </div>
        </div>
      </div>

      </form>
      </div>
    </>
  )
}

export default About
