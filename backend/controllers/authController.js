const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { BadRequest, NotFoundError } = require('../utils/error');

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new BadRequest('Missing required field')
        } else {
            const user = await User.findOne({ email: email });
            if (user) {
                throw new BadRequest(`User with email ${email} is already registered`)
            } else {
                const hash = await bcrypt.hash(password, 10);
                const user = await User.create({ username: username, email: email, hash: hash })
                req.login(user, (err) => {
                    if (err) return next(err);
                    res.status(200).json({
                        status: 'success',
                        message: `User ${username} with email ${email} has been registered`
                    });
                });
            }
        }
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err || !user) {
                if (info) throw new BadRequest(info.message);
                else next(err);
            } else {
                req.login(user, (err) => {
                    if (err) return next(err);
                    res.status(200).json({
                        id: user.id,
                        username: user.username,
                        email: user.email
                    })
                })
            }
        })(req, res, next);
    } catch (error) {
        next(error);
    }
}

exports.logout = (req, res, next) => {
    try {
        req.logout();
        res.clearCookie('connect.sid', { path: '/' })
        req.session.destroy((err) => {
            if (err) return next(err)
            res.status(200).json({
                status: 'success',
                message: 'Logged out'
            })
        })
    } catch (error) {
        next(error)
    }
}

exports.getLogginInUser = (req, res, next) => {
    try {
        res.status(200).json({
            id: req.user.id,
            username: req.user.username,
            email: req.user.email
        })
    } catch (err) {
        next(new NotFoundError(err.message))
    }
}