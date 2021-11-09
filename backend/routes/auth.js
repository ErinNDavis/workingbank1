const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
//const rounds = 10;
const jwt = require('jsonwebtoken');
const tokenSecret = "my-token-secret";

const middleware = require('../middlewares')

function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}

router.get('/login', (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) res.status(404).json({error: 'no user with that email found'})
        else {
            /**bcrypt.compare(req.body.password, user.password, (error, match) => {
                if (error) res.status(500).json(error)
                else if (match) res.status(200).json({token: generateToken(user)})
                else res.status(403).json({error: 'passwords do not match'})
            })*/
            compare(req.body.password, user.password, (error, match) => {
                if (error) res.status(500).json(error)
                else if (match) res.status(200).json({token: generateToken(user)})
                else res.status(403).json({error: 'passwords do not match'})
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.post('/signup', (req, res) => {
    //bcrypt.hash(req.body.password, rounds, (error, hash) => {
    //    if (error) res.status(500).json(error)
    //    else {
            const newUser =  User({name: req.body.name, email: req.body.email, password: req.body.password, balance: req.body.balance})
            newUser.save()
                .then(user => {
                    res.status(200).json({token: generateToken(user)})
                })
                .catch(error => {
                    res.status(500).json(error)
                })
        //}
    //})
});

router.get('/jwt-test', middleware.verify , (req, res) => {
    res.status(200).json(req.user)
})


module.exports = router