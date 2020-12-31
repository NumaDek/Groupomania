const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const userRoute = require('./routes/userRoutes');
const helmet = require('helmet');

const app = express();
const path = require('path');

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
