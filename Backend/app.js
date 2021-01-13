const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const userRoute = require('./routes/userRoutes');
const helmet = require('helmet');
const mysql = require('mysql');
const app = express();
const path = require('path');
const expressSanitize = require('express-sanitize');


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: 'secret',
    database: 'groupomaniadatabase'
});

console.log('Connecting to database...');
db.connect((err) => {
    if (err)
        throw err;
    console.log('Database connected...');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());
app.use(expressSanitize);
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.use('/api/auth', userRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/gag', apiRoutes);

module.exports = app;
