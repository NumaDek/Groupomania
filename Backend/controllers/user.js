const jwt = require('jsonwebtoken');

const salt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhemVydHl1aW9wMCIsImlhdCI6MTYwOTc2NDEwOCwiZXhwIjoxNjA5ODUwNTA4fQ.yYqHi3qApbkRB0VxAceXUGzWsPek84qUZhcp6e1qlMM';

exports.signup = (req, res, next) => {
    const user = {
        id: 'azertyuiop' + users.length,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        pwd: req.body.password,
        posts: []
    }
    users.push(user);
    res.status(201).json({ message: 'Account created' });
}

exports.login = (req, res, next) => {
    for (user of users) {
        if (user.email == req.body.email && user.pwd == req.body.password) {
            const payload = {
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    salt,
                    { expiresIn: '24h' })
            }
            res.status(200).json(payload);
            return;
        }
    }
    res.status(401).json('Account not found');
};

exports.getProfiles = (req, res, next) => {
    userId = JSON.parse(req.headers.authorization.split(' ')[1]).userId;
    console.log(userId);
    if (userId == 'azertyuiop0')
        res.status(200).json(users);
    else
        res.status(401).json('Unauthorized');
};

const users = [
    {
        userId: 'azertyuiop0',
        firstname: 'Numa',
        lastname: 'Dekeyser',
        email: 'numadek@gmail.com',
        pwd: 'salut',
        posts: []
    },
    {
        userId: 'azertyuiop1',
        firstname: 'Numa',
        lastname: 'Dekeyser',
        email: 'numadek@free.com',
        pwd: 'salut',
        posts: []
    },
    {
        userId: 'azertyuiop2',
        firstname: 'Numa',
        lastname: 'Dekeyser',
        email: 'numadek@tofu.com',
        pwd: 'salut',
        posts: []
    },
    {
        userId: 'azertyuiop3',
        firstname: 'Numa',
        lastname: 'Dekeyser',
        email: 'numadek@yo.com',
        pwd: 'salut',
        posts: []
    },
    {
        userId: 'azertyuiop3',
        firstname: 'Numa',
        lastname: 'Dekeyser',
        email: 'numadek@yo.com',
        pwd: 'salut',
        posts: []
    },
]