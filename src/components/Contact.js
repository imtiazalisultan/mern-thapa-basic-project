import React, { useEffect, useState } from 'react';


const Contact = () => {

  const [userData, setUserData] = useState({name:"",email:"",phone:"",message:""});

  
  const callUserData = async()=>{

    try{
      const res = await fetch('/getData',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        }
      });
      const data = await res.json();

      setUserData({...userData,name:data.name, email:data.email, phone:data.phone, message:data.message});
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    }
    catch(err)
    {console.log(err);}
  
  };
  
  const handleInput = (e) =>{
    let name = e.target.name;
     let value  = e.target.value;
 
     setUserData({...userData,[name]:value});
   };

   const handleSubmit = async(e) =>{
    e.preventDefault();
   
    const { name, email, phone, message} = userData;

    const res = await fetch('/contact',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,phone,message
      })
    });
    const data = await res.json();

    if(!data){

      console.log("Message Not Send");
    }else{
      alert("Messsage Send Successfully");
      setUserData({message: ""});
    }
  }

useEffect(()=>{
  callUserData();
},[])

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <h1>Contact Us Page</h1>
     
   
     <div className='contact-form'>
        <div className='contact-form-title' style={{color:'aqua'}}>
            Get In Touch
        </div>
        <div className='contact-form-body'>
            <form method='POST' >
                <input type="text" name='name' value={userData.name}  onChange={handleInput}  placeholder="Your Name" required="true"/><br/><br/>
                <input type="email" name='email' value={userData.email} onChange={handleInput}  placeholder="Your Email" required="true"/><br/><br/>
                <input type="number" name='phone' value={userData.phone}  onChange={handleInput} placeholder="Your Number" required="true"/><br/><br/>
                <textarea cols="30" name='message' value={userData.message} onChange={handleInput}  rows="10" placeholder="Message"></textarea><br/><br/>
                <button type='submit' onClick={handleSubmit} >Send Message</button><br/><br/>
            </form>
        </div>
     </div>
     <div>
        Phone No:<span>+91 8828768148</span>
      </div>
      <div>
        Email : <span>mohammedimtiaz2011@gmail.com</span>
      </div>
      <div>
        Address :<span>Mumbai</span><br/><br/>
      </div>
    </div>
  )
}

export default Contact
