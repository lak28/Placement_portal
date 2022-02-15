// File to contain the main Database format of the application

const mongoose=require('mongoose');

// schema to store all users 
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
});


const User = mongoose.model('User', userSchema);
module.exports = User;
