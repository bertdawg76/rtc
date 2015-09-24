var User = require('./userModel.js');


module.exports = function (server, express) {
    var router = express.Router();
    var mongoose = require('mongoose');
    var passport = require('passport');

   

    router.route('/')

    // Create a new User
        .post('/register', function(req, res, next) {
            if(!req.body.username || !req.body.password) {
                return res.status(400).json({message: 'Please fill out all the form'});
            }

            var user = new User();

            user.username = req.body.username;

            user.setPassword(req.body.password)

            user.save(function (err) {
                if(err){ return next(err); }

                return res.json({token: user.generateJWT()})
            });
        });

        .post('/login', function(req, res, next){
            if(!req.body.username || !req.body.password){
                return res.status(400).json({message: 'Please fill out all the form'});
            }

            passport.authenticate('local', function(err, user, info){
                if(err){ return next(err); }

                if(user){
                    return res.json({token: user.generateJWT()});
                } else {
                    return res.status(401).json(info);
                }
            })(req, res, next);
        })

        .get(function(req, res) {
            User.find().exec(function(err, users) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Could not find the User.'
                    });
                }
                res.status(200).json(users)
            })
        });

    router.route('/:id')
        .get(function(req, res) {
            User.findById(req.params.id).exec(function(err, user) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Unable to find that User!'
                    });
                }
                if (!!user) {
                    res.status(200).json({
                        success: true,
                        data: user
                    });
                } else {
                    return res.status(404).json({
                        success: false,
                        message: 'The User you are looking for happens to be out to lunch, please try again in a little while.'
                    });
                }
            });
        })



    return router;