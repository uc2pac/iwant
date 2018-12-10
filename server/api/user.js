const User = require('../models/user');
const bcrypt = require('bcrypt');
const JwtUtils = require('../utils/jwt');

// TODO: thisnk of an fix all status codes

module.exports = (app, nextApp) => {
    app.post('/api/user/signup', (req, res) => {
        const { email, password } = req.body;

        // TODO: validate password

        bcrypt.hash(password, 10)
            .then((hash) => {
                const newUser = new User({ 
                    email,
                    password: hash
                });
    
                return newUser.save();
            })
            .then(user => {
                // TODO: create validate email flow
                // for now we'll redirect to sign in page
                nextApp.render(req, res, '/auth/signin', {});
            }).catch(err => {
                res.status(500).send({message: err});
            });
    });

    app.post('/api/user/signin', (req, res) => {
        const { email, password } = req.body;
        
        // TODO: validate password and email

        User.find({email})
            .then(([user]) => {
                if (!user) throw 'Incorrect email or password.';

                return Promise.all([
                    bcrypt.compare(password, user.password),
                    user
                ]);
            })
            .then(([isValid, user]) => {
                if (!isValid) throw 'Incorrect email or password.';
                const token = JwtUtils.generateJWT(user);

                res.status(200)
                    .cookie('iw.s', token, {
                        maxAge: 24 * 60 * 60 * 1000,
                        httpOnly: true
                    })
                    .send({message: 'ok'});
            })
            .catch(err => {
                res.status(500).send({message: err});
            });
    });

    app.get('/api/user/signout', (req, res) => {
        res
            .status(200)
            .clearCookie('iw.s')
            .end();
    });
}