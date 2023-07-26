const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        minlength : 10,
        required:true,
        // validate(value){
        //     if(value > 11){
        //         throw new Error('mobile no. exceeded value ')
        //     }
        // } 
        },
    work:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Cannot contain the String Password')
            }
        }
    },
    cpassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now(),

    },
    messages:[
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            phone:{
                type:Number,
                minlength : 10,
                required:true,
                },
            message:{
                type:String,
               
            },
        }
    ],

    tokens: [
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
});

//we are hashing the password...
userSchema.pre('save',async function(next){
      
    if(this.isModified('password')){
        
        this.password = await bcrypt.hash(this.password, 12);
     // User.Password =  ----------------(Current.Password,--. )
        this.cpassword = await  bcrypt.hash(this.cpassword, 12);   
    }
    next();
   
});
  
//we are generating Token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

//
userSchema.methods.addMessage = async function(name,email, phone, message){
    try{
        this.messages = await this.messages.concat({name,email, phone, message});
        await this.save();
        return this.messages;
        
    }catch(err){
        console.log(err);
    }
}

//collection creation...
const User = mongoose.model('User',userSchema);

module.exports = User;