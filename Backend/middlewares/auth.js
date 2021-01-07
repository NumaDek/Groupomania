const jwt = require('jsonwebtoken');

const salt = 'qemrghermigherivqinvrnvqmernvidjvNDJCLBDCHVUQERBGERUIBGAUERIBVUBVERBMGQERUIBGUFVJVJQREVBURHVEQRUVBUMIBVUQIZEBVQEBQMEBMVUBUIEB';

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