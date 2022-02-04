/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const player = document.querySelector('h2');
const WIDTH = 7;
const HEIGHT = 6;
//variable to keep track of current player
let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //make empty board by setting all indexes to null
  for (let i = 0; i < HEIGHT; i++) {
    board.push([]);
    for (let j = 0; j < WIDTH; j++) {
      board[i].push(null);
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // get "htmlBoard" letiable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // TODO: add comment for this code
  //create HTML element "tr" and give it the id "coloumn-top" so it will style accordingly by our CSS Stylesheet
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //using a loop we create HTML element "td" and give it the id "x" so it will style accordingly by our CSS Stylesheet
  //this it our top row where we will click to put chips, we append this to our "tr" element top
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // using a loop by row x coloumn we create "td"'s for the board game displayed to user, we add the id "row-coloumn" so we can easily manipulate it later
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);

      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  //if the top of the column is filled we return null as column is full
  if (board[0][x]) {
    return null;
  }
  //we check the coloumn from top to bottom to find first filled piece, if we find the filled piece we return the piece above it
  for (let y = 0; y < HEIGHT; y++) {
    if (board[y][x] !== null) return y - 1;
  }
  //if the whole column is empty then we return bottom row
  return 5;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // make a div and insert into correct table cell
  const piece = document.createElement("div");
  //add the class that will style according to the player that chose it 
  piece.classList.add("piece", `p${currPlayer}`);
  const placement = document.getElementById(`${y}-${x}`)
  placement.append(piece)


}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    if (currPlayer === 2) {
      document.body.style.backgroundImage = "url('https://wallpapercave.com/wp/wp5076212.jpg')";
      player.innerText = "THE TRUE POWER OF THE DARK SIDE!";
      return endGame(`THE TRUE POWER OF THE DARK SIDE! PLAYER ${currPlayer} won!`);
    } else {
      document.body.style.backgroundImage = "url('https://www.pixel4k.com/wp-content/uploads/2021/03/baby-yoda-the-mandalorian-4k_1615205514.jpg')"
      player.innerText = "THE FORCE IS STRONG!";
      return endGame(`THE FORCE IS STRONG! PLAYER ${currPlayer} won!`);

    }

  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  console.log(board.every(row => row.every(current => current !== null)))
  if (board.every(row => row.every(current => current !== null))) {
    endGame("Board Full - No WINNER!")
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;

  //update text on screen to display which players turn
  player.innerText = `Turn: Player ${currPlayer}`;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }


  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //horiz checks the horizontal chips and returns the player list for them in an array
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //vert checks the vertical chips and returns the player list for them in an array
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //diagDR checks the diagonal chips to the right and up and returns the player list for them in an array
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //diagDL checks the diagonal chips to the left and down and returns the player list for them in an array
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      //checks for chips match in all directions
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
