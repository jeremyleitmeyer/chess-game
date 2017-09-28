
//login
var myModal = document.querySelector("#myModal")
var btn = document.getElementById("startBtn")
var uName = document.getElementById("uName")
var you = document.getElementById("you")
var c = document.querySelector("board")
var socket = io()


uName.addEventListener("keyup", function(){
	var v = uName.value.length

	if(v != 0) {
		btn.disabled = false;
		you.innerHTML = uName.value
	}
})

$(function () {
	var socket = io();
	$('.chat-input').submit(function(){
	  socket.emit('chat message', $('#uName').val(), $('#m').val());
	  $('#m').val('');
	  return false;
	});
	socket.on('chat message', function(name, msg){
	  $('#messages').append('<li>' + name + ': ' + msg + '</li>');
	 	var elem = document.getElementById('messages');
   	elem.scrollTop = elem.scrollHeight;
	});
});

$(function () {
	$("#login-form").submit(function(){
			socket.emit('usercon', $('#uName').val())
	    return false;
	});
	socket.on('usercon', function(name){
		$('#messages').append('<li class="join">' + name + ' has joined the lobby' + '</li>')
	})	
});


//leaderboards

Vue.component('score-item', {
  props: ['score'],
  template: '<li>{{ score.text }}</li>'
})
var leaderboard = new Vue({
  el: '#leaderboard',
  data: {
    scoreList: [
      { id: 0, text: 'Jeremy' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Lemons' }
    ]
  }
})

// modal

window.addEventListener("load", function(){
  setTimeout(function(){
  
    myModal.classList.remove("hidden")

  }, 0000)
})

var close = document.querySelector(".close")

close.onclick = function() {
	myModal.classList.add("hidden")
}

