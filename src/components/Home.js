import React, { useEffect, useState } from 'react';

const Home = () => {

  const [userName, setUserName] = useState('');

  const userHomePage = async()=>{
    try{
      const res =await  fetch('/getData',{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      });
      const data = await res.json();
    
      setUserName(data.name);

    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    userHomePage();
  },[])

  return (
    <div className='homeComponent'>
      <h1>Welcome </h1>
      <h2 className='userName'>{userName}</h2>
      {userName ? <h2>Happy to see you back !</h2>:<h2>We Are the MERN Developer</h2>}
      
    </div>
  )
}

export default Home
