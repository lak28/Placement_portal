// File to contain the controllers of the batches

const Batch= require('../models/batch');

// returning add batch form 
module.exports.add= function(req,res){
    return res.render('forms/addbatch');
}

// handling a batch creation form submission and adding data in database
module.exports.create= function(req,res){
    req.flash('success','Batch Created Successfully!');
    Batch.create(req.body);
    res.redirect('/batch/view');
}

// retriving all batches information and passing that list to views 
module.exports.view=async function(req,res){
    try{
        let batches= await Batch.find({});
        return res.render('viewlists/viewbatch',{
            batches:batches
        });
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}
