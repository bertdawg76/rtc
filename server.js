var express = require('express'),
 	bodyParser = require('body-parser'),
 	cors = require('cors'),
 	cookieParser = require('cookie-parser'),
 	passport = require('passport'),
 	mongoose = require('mongoose'),
 	port = process.env.PORT || 9000,
 	mongoUri = 'mongodb://bert:adminpassword@ds051943.mongolab.com:51943/rtc-practice',
 	questionCtrl = require('./questions/questionCtrl.js')(server, express),
 	userCtrl = require('./users/userCtrl.js')(server, express),
 	server = express();

 	

 require('./config/passport');








server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/api/questions', questionCtrl);
server.use('/api/users', userCtrl);





server.use(express.static(__dirname + '/public'));
server.use(passport.initialize());


mongoose.set('debug', true);
mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
	console.log('connected to mongoDB at: ', mongoUri);
})

server.all('/*', function (req, res, next) {
	res.sendFile('index.html', { root: __dirname + '/public' });
});





server.listen(port, function() {
  console.log('connected to: ', port);
});