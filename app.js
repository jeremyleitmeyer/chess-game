// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var socketUsers = require('socket.io.users');
var uuid = require('uuid/v4');


app.use(express.static(__dirname + '/chess.js'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules')); 

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
    console.log('IO DEBUG: Socket '+ socket.id + ' is ready \n');
    console.log('a user connected');

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

	socket.on('chat message', function(msg){
	  io.emit('chat message', msg);
	});
});

server.listen(3000);
console.log('Listening on :3000')