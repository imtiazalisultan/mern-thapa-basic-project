const mongoose = require('mongoose');
const db = process.env.DATABASE;

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log(`MongoAtlas connection successfull :)`))
.catch((err)=>console.log(`MongoAtlas connection is not Successfull :( `,err))

// mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true});
// var db = mongoose.connection;
// db.on('error',console.error.bind(console,'connection error:'));
// db.once('open',function(){
//     console.log('MongoDB Connected...');
// })