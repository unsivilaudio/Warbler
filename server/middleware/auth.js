require('dotenv').config();
const jwt = require('jsonwebtoken');

// Make sure the user is loged in
const loginRequired = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: 'Please log in first',
                });
            }
        });
    } catch (e) {
        return next({
            status: 401,
            message: 'Please log in first',
        });
    }
};

// Make sure the we get the correct user
const ensureCorrectUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (decoded && decoded.id === req.params.id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: 'You are not authorized to do that.',
                });
            }
        });
    } catch (e) {
        return next({
            status: 401,
            message: 'You are not authorized to do that.',
        });
    }
};

module.exports = { loginRequired, ensureCorrectUser };
