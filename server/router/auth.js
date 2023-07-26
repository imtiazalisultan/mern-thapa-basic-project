const express = require('express');
const jwt = require('jsonwebtoken'); 
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const middleware = require('../middleware/authenticate');
require('../db/connect');  //file for mongoDB connection...


router.get('/',(req,res)=>{
    
    res.send('Hello From the SerVer~ side')
});


//Using Promises (then, catch)
// router.post('/register',(req,res)=>{

//     const {name, email, phone, work, password, cpassword} = req.body;
  
//     if(!name || !email || !phone || !work || !password || !cpassword){  //this condition says that if there is one field is absent then it willl return error
//         return res.status(422).send('Plz filled the Field Properly');
//     };

//     User.findOne({email:email})
//     .then((userExist) =>{
//         if(userExist){
//             return res.status(422).send({error:"Email already Exist"})
//         }

//         const user = new User({name, email, phone, work, password, cpassword});
        
//         user.save()
//         .then(()=>{
//             res.status(201).send({message:"User Registered Successfully"});
//         })
//         .catch(err=>res.status(500).send({error: "Failed to Registered"}));
//     })
//     .catch((err)=>console.log(err))

  
// });


//using Async-Await
router.post('/register',async(req,res)=>{

    const {name, email, phone, work, password, cpassword} = req.body;

        if(!name || !email || !phone || !work || !password || !cpassword){  //this condition says that if there is one field is absent then it willl return error
            return res.status(422).send('Plz filled the Field Properly');
        };

    try{
        
       const userExist = await User.findOne({email:email});
    
     if(userExist){
        return res.status(422).send({error:"Email already registered"});
      }
       else if(password != cpassword){
        return res.status(422).send({error:"password not match"});
      
       }else{
        
       const user = new User({name, email, phone, work, password, cpassword});

       const userRegister = await user.save();
     
       userRegister ? res.status(201).send({message:"user registered successfully"}) : res.status(500).send({error:"Failed to Registered"});

       }
    
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server Error",err)
    }
})


//User SignIN
router.post('/signin',async(req,res)=>{

    

    const {email, password} = req.body;

        if(!email || !password){  //if any of the field is Empty...
            return res.status(400).json({error:"Plz filled the Data properly"});
        };

    try{ 
        let token;
        const userLogin = await User.findOne({email:email});
        //console.log(userLogin);

        const passwMatch = await bcrypt.compare(password, userLogin.password);
     
        token = await userLogin.generateAuthToken();
        // console.log(token);
        res.cookie('jwtoken',token,{
            expires: new Date(Date.now()+ 253034600),
            httpOnly: true
        })

        userLogin && passwMatch ? res.status(200).json({message:"User logIn Successfully"}) : res.status(422).json({error: "Invalid Credentials"});

        
        // if(userLogin && passwMatch){
        //     res.status(200).send('User Login Successfully');
        // }else{
        //     res.status(400).send("Invalid Credentials")
        // }


        // if(userLogin){
            
        //     const passwMatch = await bcrypt.compare(password, userLogin.password);
        //     console.log(passwMatch);
        //     if(!passwMatch){
                
        //         res.status(400).send("Invalid Credentials")
        //     }else{
               
        //         res.status(200).send('User Login Successfully');
        //     }
        // }else{
        //     res.status(400).send("Invalid Credentials")
        // }

    }catch(err){
        console.log(err);
    }
});

router.get('/about', middleware ,(req,res,next)=>{
    console.log(`hello About world from Server`);
   // console.log(req.rootUser);
    res.send(req.rootUser);
});

//Get User data for Contact Us and Home Page
router.get('/getData', middleware ,(req,res,next)=>{
    console.log(`hello GetData world from Server`);
   // console.log(req.rootUser);
    res.send(req.rootUser);
});
router.post('/contact', middleware ,async (req,res,next)=>{
    
   
    try{

        const {name, email, phone, message} = req.body 

        if(!name || !email || !phone || !message){
            return res.status(400).json({error:"Plzz filled the Contact form"});
        }

        const userContact = await User.findOne({_id : req.userID});

        if(userContact){
            const userMessage = await userContact.addMessage(name,email, phone, message);

            await userContact.save();
            res.status(201).json({message:"User Contact mesaage successfully"});
        }else{
            res.status(400).json({message:"User is NOT Exist"})
        }

    }catch(err){
            console.log(err);
    }
    
});

//Logout Page
router.get('/logout',(req,res)=>{
    console.log(`helllo my Logout Page`);
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User Logout Successfull');
})

module.exports = router;