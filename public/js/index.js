
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

//leaderboards

// vue.js

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

