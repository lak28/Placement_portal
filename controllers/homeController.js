// File to contain the Controller of the main page

const User = require('../models/users');

module.exports.home= async function (req,res){
    

    try{
        let user=await User.find({});
        return res.render('home', {
            all_users:user
        });
            
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}
