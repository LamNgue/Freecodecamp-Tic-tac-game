// my code is partially based on a tutorial on the internet. I confirmed that I have read and fully understood the code before writing.
var human = "X";
var computer = "O";
var board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
$(document).ready(function() {
  function makePrompt() {
    var choose = prompt("Please choose a sign", "X or O");
    if (choose == "X") {
      human = "X";
      computer = "O";
    } else if (choose == "O") {
      human = "O";
      computer = "X";
    }
  }
  $("#choose").click(function() {
    makePrompt();
  });
  function reset() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        board[i][j] = " ";
        $(".square[data-row=" + i + "][data-col=" + j + "]").html(" ");
        human = "X";
        computer = "O";
      }
    }
  }
  $("#reset").click(function() {
    reset();
  });
  $("#sq0").click(function() {
    $(this).html(human);
    board[0][0] = human;
  });
  $("#sq1").click(function() {
    $(this).html(human);
    board[0][1] = human;
  });
  $("#sq2").click(function() {
    $(this).html(human);
    board[0][2] = human;
  });
  $("#sq3").click(function() {
    $(this).html(human);
    board[1][0] = human;
  });
  $("#sq4").click(function() {
    $(this).html(human);
    board[1][1] = human;
  });
  $("#sq5").click(function() {
    $(this).html(human);
    board[1][2] = human;
  });
  $("#sq6").click(function() {
    $(this).html(human);
    board[2][0] = human;
  });
  $("#sq7").click(function() {
    $(this).html(human);
    board[2][1] = human;
  });
  $("#sq8").click(function() {
    $(this).html(human);
    board[2][2] = human;
  });
  $(".square").click(function() {
    var gameState = checkWinner(board);
    gameState = checkWinner(board);
    if (gameState) {
      alert("The winner is: " + gameState);
      reset();
      return;
    } else if (gameState === null) {
      alert("No one wins");
      reset();
      return;
    } else {
      var move = callAi();
      //move the ai player
      board[move.row][move.col] = computer;
      $(".square[data-row=" + move.row + "][data-col=" + move.col + "]").html(
        computer
      );
    }
    gameState = checkWinner(board);
    if (gameState) {
      alert("The winner is: " + gameState);
      reset();
    }
    gameState = checkWinner(board);
  });

  function checkWinner(board) {
    for (var i = 0; i < 3; i++) {
      if (
        board[i][0] !== " " &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        return board[i][0];
      }
    }
    // vertical
    for (var j = 0; j < 3; j++) {
      if (
        board[0][j] !== " " &&
        board[0][j] === board[1][j] &&
        board[0][j] === board[2][j]
      ) {
        return board[0][j];
      }
    }
    // diagonal - top left
    if (
      board[0][0] !== " " &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      return board[0][0];
    }
    // diagonal - bottom left
    if (
      board[2][0] !== " " &&
      board[2][0] === board[1][1] &&
      board[2][0] === board[0][2]
    ) {
      return board[2][0];
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board[i][j] === " ") {
          return false;
        }
      }
    }
    return null;
  }

  function callAi() {
    return minimax(board, 0, computer);
  }

  function minimax(newBoard, depth, player) {
    var gameState = checkWinner(newBoard);
    if (gameState === false) {
      var values = [];
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          var testboard = JSON.parse(JSON.stringify(newBoard));
          if (testboard[i][j] !== " ") continue;
          testboard[i][j] = player;
          var value = minimax(
            testboard,
            depth + 1,
            player === human ? computer : human
          );
          values.push({
            cost: value,
            position: {
              row: i,
              col: j
            }
          });
        }
      }
      if (player === computer) {
        var max = _.maxBy(values, function(object) {
          return object.cost;
        });
        if (depth === 0) {
          return max.position;
        } else {
          return max.cost;
        }
      } else {
        var min = _.minBy(values, function(object) {
          return object.cost;
        });
        if (depth === 0) {
          return min.position;
        } else {
          return min.cost;
        }
      }
    } else if (gameState === null) {
      return 0;
    } else if (gameState === human) {
      return depth - 10;
    } else if (gameState === computer) {
      return 10 - depth;
    }
  }
});