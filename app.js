// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var socketUsers = require('socket.io.users');
var uuid = require('uuid/v4');
var port = process.env.PORT || 8080;


app.use(express.static(__dirname + '/chess'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules')); 

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection',function(socket){
    console.log('IO DEBUG: Socket '+ socket.id + ' is ready \n');
    console.log('a user connected');

	socket.on('update', function(update){
	  	io.sockets.emit('update', update)
	  	console.log(update)
	})

	socket.on('reset', function(update){
		io.sockets.emit('reset', update)
		console.log(update)
	})

	socket.on('disconnect', function(){
	  console.log('user disconnected');
	});

	socket.on('move', function(move){
		io.emit('move', move)
	})

	socket.on('checkmate', function(gameOver){
		io.emit('checkmate', gameOver)
	})

	socket.on('draw', function(gameOver){
		io.emit('draw', gameOver)
	})

	socket.on('turn', function(turn){
		io.emit('turn', turn)
	})

	socket.on('check', function(gameOver){
		io.emit('check', gameOver)
	})

	socket.on('chat message', function(name, msg){
	  io.emit('chat message', name, msg);
	});

	socket.on('usercon', function(name){
	  io.emit('usercon', name);
	});
});




server.listen(port, function(){
	console.log('Doing the thang on:' + port)
});
