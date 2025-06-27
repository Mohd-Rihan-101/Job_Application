const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/jobDB')
.then(()=>{
    console.log("Database Connect Succesfully");
}).catch((err)=>{
    console.log(err);
})