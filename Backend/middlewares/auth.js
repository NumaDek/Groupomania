const jwt = require('jsonwebtoken');

const salt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhemVydHl1aW9wMCIsImlhdCI6MTYwOTc2NDEwOCwiZXhwIjoxNjA5ODUwNTA4fQ.yYqHi3qApbkRB0VxAceXUGzWsPek84qUZhcp6e1qlMM';

module.exports = (req, res, next) => {
    try {
        const token = JSON.parse(req.headers.authorization.split(' ')[1]);
        if (token.token == null)
            throw 'Missing token';
        const decodedToken = jwt.verify(token.token, salt);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new error('invalid request!')
        });
    }
};