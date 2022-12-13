const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
var http = require("http");


const locationRoutes = require('./routes/locationRoutes');
const bidRoutes = require('./routes/bidRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
// const formidable = require('express-formidable');

var bodyParser = require('body-parser')
const path = require('path');

// https://www.youtube.com/watch?v=mbsmsi7l3r4
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// express app
const app = express();

const url =  process.env.URL;
const port =  process.env.PORT ;
const db =  process.env.DB;


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: db })
  .then(result => app.listen(port))
  .catch(err => console.log(err));
// register view engine
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



app.use('/api/location', locationRoutes);
app.use('/api/bid', bidRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/favorite', favoriteRoutes);


setInterval(function() {
   console.log("it worked");
    http.get("http://fvmnode.herokuapp.com");
}, Math.floor(Math.random() * (8 - 1) + 1)*100000); // every 5 minutes (300000)


app.get('/', (req, res) => {
  res.render('index', { title: 'FVM' });
});


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});