$(function () {
	var socket = io();
	$('.chat-input').submit(function(){
	  socket.emit('chat message', $('#m').val());
	  $('#m').val('');
	  return false;
	});
	socket.on('chat message', function(msg){
	  $('#messages').append('<li>' + msg + '</li>');
	 	var elem = document.getElementById('messages');
   	elem.scrollTop = elem.scrollHeight;
	});
});

$(function () {
	$("#login-form").submit(function(e){
	    return false;
	});
});
