const { urlencoded, json } = require('body-parser');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
var path = require('path')
const db=require('./server/config/db');
const passport= require ('passport');
const session = require ('express-session');
const MongoStore= require('connect-mongo');
const methodOverride = require ('method-override');

const app = express();
db();
app.use(express.static('public'));
app.use(session({
    secret: 'helloooo',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL
    }),
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))


app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layout/main');
app.set('views', path.join(__dirname, 'views'));

// Define routes
app.use('/', require('./server/routes/routes'));
app.use('/',require('./server/routes/auth'));
app.use('/',require('./server/routes/dashboard'));

app.use('*',function(req,res){
    locals={
        title: 'Not Found'
    }
    res.status(404).render('404',{
        ...locals,
        layout: './layout/front-page'
    })

})
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
