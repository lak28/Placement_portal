const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
var port = process.env.PORT ||3000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passportGoogle=require('./config/passport-google-auth2-strategy');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoDbStore = require('connect-mongo');

const flash=require('connect-flash');


const middleware=require('./config/middleware');






app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'placementcell',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoDbStore.create({
        mongoUrl: 'mongodb+srv://lak2896:12345@cluster0.92kkk.mongodb.net/placementDatabase?retryWrites=true&w=majority',
        mongooseConnection:db,
        autoRemove: 'disabled'
    },function(err){
        console.log("error ",err);
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);



// adding flash messages
app.use(flash());
app.use(middleware.setFlash);


// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
