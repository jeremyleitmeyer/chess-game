
//login
var myModal = document.querySelector("#myModal")
var btn = document.getElementById("startBtn")
var uName = document.getElementById("uName")
var you = document.getElementById("you")


uName.addEventListener("keyup", function(){
	var v = uName.value.length

	if(v != 0) {
		btn.disabled = false;
		you.innerHTML = uName.value
	}
})

//leaderboards



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

// loading animation
var obj = { Loading: '0%' };

// var JSobject = anime({
//   targets: obj,
//   charged: '100%',
//   round: 1,
//   easing: 'linear',
//   update: function() {
//     var el = document.querySelector('#JSobject pre');
//     el.innerHTML = JSON.stringify(obj);
//   }
// });

// maybe this ??
// var lineDrawing = anime({
//   targets: '#lineDrawing .lines path',
//   strokeDashoffset: [anime.setDashoffset, 0],
//   easing: 'easeInOutSine',
//   duration: 2000,
//   delay: function(el, i) { return i * 300 },
//   direction: 'alternate',
//   loop: true
// });

