const User = require('../models/user');
const jwt = require('jsonwebtoken');

async function signin(req, res, next) {
    try {
        let user = await User.findOne({ email: req.body.email });
        let { id, username, profileImageUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign(
                {
                    id,
                    username,
                    profileImageUrl,
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token,
            });
        } else {
            return next({
                status: 400,
                message: 'Invalid email or password',
            });
        }
    } catch (e) {
        return next({
            status: 400,
            message: e.message,
        });
    }
}

async function signup(req, res, next) {
    try {
        let user = await User.create(req.body);
        let { id, username, profileImageUrl } = user;
        let token = jwt.sign(
            {
                id,
                username,
                profileImageUrl,
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token,
        });
    } catch (err) {
        if (err.code === 11000) {
            err.message = 'Sorry, that username and/or email is taken';
        }
        return next({
            status: 400,
            message: err.message,
        });
    }
}

module.exports = { signin, signup };
