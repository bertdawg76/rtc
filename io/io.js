var _ = require('lodash');

module.exports = function(server, io){
	console.log('setting up socket server');
	var basket = {};

	io.on('connection', function(socket){
		console.log('User Connected', socket.id);
		//In navCtrl we make it so that each socket calls home with their heart_beat as soon as they connect.
		socket.on('heart_beat', function(msg){
			//Add the users socket to the basket
			socket.username = msg.user;
			basket[msg.user] = socket;
		});
		socket.on('rob_is_awesome', function(msg){
			//Iterate over all the sockets in the basket using lodash.
			//Lodash makes it easy to iterate over keys in an object.
			_.forEach(basket, function(s, key){
				//If the key in the basket is not = to the users socket.username, then emit.
				//This will only emit to all other users besides yourself.
				console.log(key, socket.username);
				if(key != socket.username){
					s.emit('getting_realz', msg);
				}
			});
		});
		socket.on('disconnect', function(socket){
			//Remove the users socket from the basket
			console.log("User Disconnected");
			delete basket[socket.username];
		});
	});
};