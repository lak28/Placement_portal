//  middleware for messages for the user halp
module.exports.setFlash=function(req,res,next){
    res.locals.flash = {
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}
