var express = require('express'),
    db = require('./config/database.js'),
    config = require('./config/passport.js'),
    bodyParser = require('body-parser'),
    cors = require('cors'),

    passport = require('passport'),
    mongoose = require('mongoose'),
    server = express();
    appServer = require('http').Server(server),
    io = require('socket.io')(appServer);
    router = express.Router(server),
    questionCtrl = require('./questions/questionCtrl.js')(server, express, router),
    userCtrl = require('./users/userCtrl.js')(server, express, router),
    port = process.env.PORT || 9000;

require('./io/io.js')(server, io);
//mongoUri = 'mongodb://bert:adminpassword@ds051943.mongolab.com:51943/rtc-practice',

/*questionCtrl = require('./questions/questionCtrl'),*/


db.connect();

server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());


server.use(express.static(__dirname + '/public'));
server.use(passport.initialize());

/*server.use('/api/questions', questionCtrl);*/
server.use('/api/questions', questionCtrl);
server.use('/api/users', userCtrl);
//server.use('/', router);

// // all other routes will be past to angular to be handled client-side
// server.all('/*', function (req, res, next) {
//  res.sendFile('index.html', { root: __dirname + '/public' });
// });


/*server.use(function(req, res, next) {
 var err = new Error('not found');
 err.status = 404;
 next(err);
 })*/


appServer.listen(port, function () {
  console.log('connected to: ', port);
});