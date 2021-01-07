const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const userRoute = require('./routes/userRoutes');
const helmet = require('helmet');
const mysql = require('mysql');
const app = express();
const path = require('path');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: 'secret',
    database: 'groupomania'
});

db.connect((err) => {
    if (err)
        throw err;
    console.log('Database connected...');
});

//let userId = 'azertyuiop3';
//let email = 'numadek@gmail.com'
//let firstname = 'Toma';
//let lastname = 'bubu';
//let pwd = 'toto';

//let sql1 = "INSERT INTO `users`(`userId`, `email`, `firstname`, `lastname`, `pwd`) VALUES(?, ?, ?, ?, ?);"
////let sql1 = `INSERT INTO 'users'('userId', 'firstname', 'lastname', 'pwd') VALUES('${userId}', '${firstname}', '${lastname}', '${pwd}');`
//db.query(sql1, [userId, email, firstname, lastname, pwd], (err, result) => {
//    if (err) throw err;
//    console.log('Query done...');
//})


//let sql = "SELECT * FROM users";
//db.query(sql, (err, result) => {
//    if (err) throw err;
//    console.log(result);
//});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.use('/api/auth', userRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/gag', apiRoutes);

module.exports = app;
