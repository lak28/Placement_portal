

// importing libraries for the page
const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');


// creating a transport engine 
let transporter=nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user:'learningdemo068',
        pass:'Demo@123'
    }
});


// render a mailer 
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log("'error in rendering template",err); return;}
            mailHTML=template;
        }
    )
    return mailHTML;
}

// exporting  the module 
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}
