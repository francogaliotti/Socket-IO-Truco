import User from "../models/User";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../config/auth')

const register = async (req, res) => {
    if (req.body.password.length >= 4) {
        if (req.body.password === req.body.password2) {
            let password = bcrypt.hashSync(req.body.password, auth.rounds)
            try {
                const user = await User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: password,
                    image: ""
                })
                let token = jwt.sign({ user: user }, auth.secret, {
                    expiresIn: auth.expires
                });
                res.json({
                    user: user,
                    token: token
                })
            } catch (err){
                res.status(500).json({
                    err
                })
            }
        
        } else {
            res.status(400).json({
                error: "Passwords do not match"
            })
        }

    } else {
        res.status(400).json({
            error: "The password must be at least 4 characters"
        })
    }

}

const login = async (req, res) => {
    let { username, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                username: username
            }
        })
        if (bcrypt.compareSync(password, user.password)) {
            let token = jwt.sign({ user: user }, auth.secret, {
                expiresIn: auth.expires
            });
            res.json({
                user: user,
                token: token
            })
        } else {
            res.status(401).json({
                error: "Incorrect password"
            })
        }
    } catch (err){
        res.status(400).json({
            error: "Username doesn't exist"
        })
    }

}
const validateToken = (req, res) => {
    res.json(req.user)
}

module.exports = {
    register,
    login,
    validateToken
}