var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var auth = jwt({secret: 'I heart donuts', userProperty: 'payload'});

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var passport = require('passport');
var Question = mongoose.model('Question');
var User = mongoose.model('User');

 
 router.post('/register', function(req, res, next) {
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

        router.post('/login', function(req, res, next){
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

router.get('/questions', function(req, res, next) {
    Question.find(function(err, result) {
        if (err) { next(err); }

        res.json(result);
    });
});

router.post('/questions', auth, function(req,res, next) {
    var question = new Question(req.body);
    post.author = req.payload.username;

    newQuestion.save(function(err, result) {
        if (err) { return next(err); }

        res.json(result);
    });
});

router.param('questions', function(req, res, next, id) {
  var query = Question.findById(id);

  query.exec(function (err, result){
    if (err) { return next(err); }
    if (!result) { return next(new Error('can\'t find question')); }

    req.result = result;
    return next();
  });
});

module.exports = router;