const mongoose = require(mongoose);

const userSchema = new mongoose.schema({
    username : {
        type : String,
        required : true
    }
    email : {
        type : String,
        
    }
})