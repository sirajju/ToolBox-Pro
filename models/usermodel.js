const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    key:{
        type:String,
    },
    pass:{
        type:String,
    },
    is_admin:{
        type:Number,
        required:true,
        default:0
    }
});

const userModel = mongoose.model('users',userSchema);
module.exports = userModel