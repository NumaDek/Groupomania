const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    console.log('Registration :');
    console.log(req.body);
    res.status(201).json({ message: 'Account created' });
}

exports.login = (req, res, next) => {
    console.log('Login :');
    console.log(req.body);
    if (req.body.email == 'numadek@gmail.com' && req.body.password == 'salut') {
        res.status(200).json({
            userId: req.body.email,
            token: jwt.sign(
                { userId: req.body.email },
                'SEL',
                { expiresIn: '24h' })
        });
    }
    else {
        res.status(401).json('Account not found');
    }
};