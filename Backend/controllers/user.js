const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const salt = 'qemrghermigherivqinvrnvqmernvidjvNDJCLBDCHVUQERBGERUIBGAUERIBVUBVERBMGQERUIBGUFVJVJQREVBURHVEQRUVBUMIBVUQIZEBVQEBQMEBMVUBUIEB';

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: 'secret',
    database: 'groupomania'
});

exports.signUp = (req, res, next) => {
    RegExpPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
    if (RegExpPassword.test(req.body.password) == false)
        return res.status(400).json({ messsage: 'This password isn\'t complex enough.' });
    RegExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (RegExpEmail.test(req.body.email) == false)
        return res.status(400).json({ messsage: 'This Email adress isn\'t correct.' });
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = [
                //'azertyuiop' + users.length,
                req.body.email,
                req.body.firstname,
                req.body.lastname,
                hash,
            ]
            console.log(user);
            let sql = "INSERT INTO `users`(`email`, `firstname`, `lastname`, `pwd`) VALUES(?, ?, ?, ?);"
            db.query(sql, user, (err, result) => {
                if (err) {
                    res.status(501).json({ err })
                    throw err;
                }
                console.log('Registration successful...');
                res.status(201).json({ message: 'Account created' });
            })
        })
        .catch(error => res.status(500).json({ error }));
}

exports.login = (req, res, next) => {
    sql = "SELECT pwd, userId FROM users WHERE email=?";
    db.query(sql, [req.body.email], (err, result) => {
        if (err) throw err;
        if (result[0] && result[0].pwd) {
            bcrypt.compare(req.body.password, result[0].pwd)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Incorrect password.' });
                    }
                    const payload = {
                        userId: result[0].userId,
                        token: jwt.sign(
                            { userId: result[0].userId },
                            salt,
                            { expiresIn: '24h' })
                    }
                    res.status(201).json(payload);
                    return;
                })
                .catch(error => res.status(500).json({ error }));
        }
    });
};

exports.getProfiles = (req, res, next) => {
    userId = JSON.parse(req.headers.authorization.split(' ')[1]).userId;
    sql = "SELECT userId, firstname, lastname, email FROM users";
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (userId == '1')
            res.status(200).json(result);
    });

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