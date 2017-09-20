var board,
  game = new Chess(),
  statusEl = $('#status'),
  fenEl = $('#fen'),
  pgnEl = $('#pgn');
  socket = io();


// game logic event listeners for chat output
  socket.on('move', function(data){
	  $('#messages').append('<li>' + data + '</li>');
	});

  socket.on('checkmate', function(data){
	  $('#messages').append('<li>' + data + '</li>');
	});

  socket.on('draw', function(data) {
    $('#messages').append('<li>' + data + '</li>');
  })

  socket.on('turn', function(data) {
    $('#messages').append('<li>' + data + '</li>');
  })

  socket.on('check', function(data) {
	  $('#messages').append('<li>' + data + '</li>');
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

  updateStatus();
};

// update the board position after the piece snap 
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
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
  onSnapEnd: onSnapEnd
};

board = ChessBoard('board', cfg);