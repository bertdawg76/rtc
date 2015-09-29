var User = require('./userModel.js');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'I heart donuts', userProperty: 'payload'});
var mongoose = require('mongoose');

module.exports = function (server, express) {
    var router = express.Router();
    
   

    router.route('/register')
    // Create a new User
        .post(function(req, res, next) {
            console.log("You made it!!!!!\n\n\n\n\n\n\n")
            if(!req.body.username || !req.body.password) {
                return res.status(400).json({message: 'Please fill out all the form'});
            }

            var user = new User();

            user.username = req.body.username;

            user.setPassword(req.body.password);

            user.save(function (err) {
                if(err){ return next(err); }

                return res.json({token: user.generateJWT()})
            });
        });

    router.route('/login')

        .post(function(req, res, next){
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
        });

        return router;
    };


        
       