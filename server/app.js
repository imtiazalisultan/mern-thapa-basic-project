const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv'); // for securing the credentials 


dotenv.config({path:'./config.env'});


const PORT = process.env.PORT || 5000;


app.use(cookieParser());
app.use(express.json())
//we link the router files to make our Route Easy...
app.use(require('./router/auth'));


//MiddleWare
const middleware=(req, res, next)=>{
   // console.log(`Hello my MiddleWare`);
    next();
}


app.get('/',(req,res,next)=>{
    res.send(`Hello World from the Server`)
});

app.get('/contact',(req,res,next)=>{
    res.cookie("jwtToken","Mady");
    res.send(`Hello from the contact page`)
});
app.get('/signIn',(req,res,next)=>{
    res.send(`Hello from the signin page`)
});
app.get('/signup',(req,res,next)=>{
    res.send(`Hello from the signup page`)
});


app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`);
});