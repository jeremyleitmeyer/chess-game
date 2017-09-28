var update
var board,
	game = Chess(),
  statusEl = $('#status'),
  fenEl = $('#fen'),
  pgnEl = $('#pgn');
  socket = io();

// game logic event listeners for chat output
var elem = document.getElementById('messages');


  socket.on('move', function(data){
	  $('#messages').append('<li>' + data + '</li>');
	  elem.scrollTop = elem.scrollHeight;
	});

  socket.on('checkmate', function(data){
	  $('#messages').append('<li>' + data + '</li>');
	  elem.scrollTop = elem.scrollHeight;
	});

  socket.on('draw', function(data) {
    $('#messages').append('<li>' + data + '</li>');
    elem.scrollTop = elem.scrollHeight;
  })

  socket.on('turn', function(data) {
    $('#messages').append('<li>' + data + '</li>');
    elem.scrollTop = elem.scrollHeight;
  })

  socket.on('check', function(data) {
	  $('#messages').append('<li>' + data + '</li>');
	  elem.scrollTop = elem.scrollHeight;
	})

	socket.on('update', function(update){
		game.load(update)
		board.position(update)
	})
// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
  if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

var onDrop = function(source, target, piece) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';

  // p1 piece renames for chat eventually
  if (piece === 'wK'){ piece = "Player 1's King" }
  if (piece === 'wQ'){ piece = "Player 1's Queen" }
  if (piece === 'wR'){ piece = "Player 1's Rook" }
  if (piece === 'wB'){ piece = "Player 1's Bishop" }
  if (piece === 'wN'){ piece = "Player 1's Knight" }
  if (piece === 'wP'){ piece = "Player 1's Pawn" }
// same for p2
  if (piece === 'bK'){ piece = "Player 2's King" }
  if (piece === 'bQ'){ piece = "Player 2's Queen" }
  if (piece === 'bR'){ piece = "Player 2's Rook" }
  if (piece === 'bB'){ piece = "Player 2's Bishop" }
  if (piece === 'bN'){ piece = "Player 2's Knight" }
  if (piece === 'bP'){ piece = "Player 2's Pawn" }

  socket.emit('move', piece + " has moved from " + source + ' to ' + target)
	console.log(game.fen())

	socket.emit('update', update = game.fen())

	updateStatus();
};


var onChange = function(oldPos, newPos) {
  console.log("Position changed:");
  console.log("Old position: " + ChessBoard.objToFen(oldPos));
  console.log("New position: " + ChessBoard.objToFen(newPos));
  console.log("--------------------");
};


var updateStatus = function() {
  var status = '';

  var moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';

    socket.emit('checkmate', moveColor + " is in checkmate")
  }

  // draw?
  else if (game.in_draw() === true) {
    status = 'Game over, drawn position';

    socket.emit('draw', "Game over, in draw.")
  }

  // game still on
  else {
    status = moveColor + ' to move';

    socket.emit('turn', moveColor + " your move.")

    // check?
    if (game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';

      socket.emit('check', moveColor + ' is in check')
    }
  }

  statusEl.html(status);
  fenEl.html(game.fen());
  pgnEl.html(game.pgn());
};

var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onChange: onChange
};

board = ChessBoard('board', cfg)

// b1 update = fen / b2 position = update /  b2 fen = position / position = fen / upda
