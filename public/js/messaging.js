$(function () {
	var socket = io();
	$('.chat-input').submit(function(){
	  socket.emit('chat message', $('#m').val());
	  $('#m').val('');
	  return false;
	});
	socket.on('chat message', function(msg){
	  $('#messages').append('<li>' + msg + '</li>');
	});
});

$(function () {
	$("#login-form").submit(function(e){
	    return false;
	    socket.emit('create', $('#uName').val());
	});
	socket.on('create', function(room){
		room = room
		console.log(room)
	})
});
