/*
[IMPORTANT]
You are free to create any number of helper function you want.
We know the problem could be seached online, and we are aware of those solutions.
So please sight sources if you took help from any online resource.
*/



//IDs for all the table elements. You get the cell element just by using document.getElementById("A1")
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

/*
An integer array of length 9.
Usaged: This is to store the state to the tictactoe board.
When a move is made
(Example player 1 (who is X) move at Cell 'A1' --- The board_state[0] will be made 1 )
Similarly, A move by player 2(who is O) at Cell 'A3' --- The board_state[2] will be made 0 )
We store the move of player 1 as '1' and player 2 as '0'. So after the above two moves the state should look like
[1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]


// A flag to keep track of the status of the game, false means the game is not started. The default value is set to false
var started = false

/*
A variable to keep track of each players turn. Since the game always starts with player 1 - The default value is set to '1'
1 means player_1
0 means player_0
*/
var turn = 1

/*
 @Return boolean
 @Param _str - A string variable - Note the type is not checked in the implementation
 The methods @Returns true is the _str is null or it has a length of 0, otherwise, the methods returns false
*/
function isEmpty(_str) {
	return (!_str || 0 === _str.length)
}

/*
@Return int This return the turn variable. Please note that
turn = 1 is for player_1 and
turn = 0 is for player_2
@Param - No param
*/
function whose_move(){
	return this.turn
}

/*
@Return void
@Param
This methods toggles the 'turn' variable.
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	this.turn = +!this.turn;
}

/*
@Return boolean
@Param
The method returns the value of the 'started' flag.
true means the game has started
false means the game has not started
When the game has not started the flag is set to false. As soon as the game starts the flag must be set to true.
Once the game has finished or user has clicked on reset_play the flag must be set to false.
*/
function game_started(){
	this.started = !this.started;
	// return this.started;
}


/*
TODO - Rule 1
This is the first method you'll implement. This method is called when the Begin Play button is clicked.
The method should do all the validations as stated in rule 1.
1. Verify if the player names are empty or not. Raise an alert if they are empty.
2. If the field are empty don't start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
3. If all verification is successful, disable the name fields and update the player moves as shown in the image.
4. If all verification is successful, update the turn information on the page. (See the source code and image). And set the started flag to true.(this will help you track at any instant if the game is in start state or not.)
5. Once game has started, Handle multiple clicks on begin play.
*/

var player1 = ""; // will store chosen name of player 1
var plater2 = ""; // will store chosen name of player 2

function begin_play(){
	if (started == true){
		alert("Already started. Please reset_play to start again");
	}
	else{
		var player1Input = document.getElementById('player1_id');
		var player2Input = document.getElementById('player2_id');
		if (player1Input.value == "" || player2Input.value == "") {
			alert("Two player game, both fields are mandatory");
			return
		}
		else{
			game_started();

			var player1Token = '<b>X</b>';
			var player2Token = '<b>O</b>';

			document.getElementById('turn_info').innerHTML = `Turn for: ${player1Token}`;

			player1 = player1Input.value;
			player2 = player2Input.value;

			player1Input.value = player1Input.value + ` (${player1Token})`;
			player2Input.value = player2Input.value + ` (${player2Token})`;
			player1Input.disabled = true;
			player2Input.disabled = true;
		}
	}
}

/*
TODO - Rule 2
This is the second method you'll implement. This method is called when the Reset Play button is clicked.
The method should do all the things as stated in rule 2.
1. The reset play button should reset the whole game.(At any time when reset is clicked - All the three text boxes should be cleared and Turn should be set to the default message.)
2. The text boxes for entering name should be enablled back.
3. The Tic Tac Toe Grid should be set to its default entries.
4. Clicking reset play again and again shall have the same effect.(or no effect when clicked multiple times)
Remember to set the started flag as false

*/
function reset_play(){
	if (started == true){ // catches case where you click reset game before you start the game
		game_started(); // sets game started to false
		if(whose_move() != 1){
			toggle_move();
		}
		var tableVals = document.getElementsByTagName('td');
		for (var i = 0; i < tableVals.length; i++) { // reset table values
			tableVals[i].innerHTML = tableVals[i].id;
		}

		document.getElementById('turn_info').innerHTML = "Game has not begun."; // reset turn info to default string
		var player1Input = document.getElementById('player1_id');
		var player2Input = document.getElementById('player2_id');
		var moveInput = document.getElementById('move_text_id');

		player1Input.value = ""; // reset player 1 name to default
		player2Input.value = ""; // reset player 2 name to default
		moveInput.value = ""; // reset move input field to default

		player1Input.disabled = false; // enable name inputs
		player2Input.disabled = false;

		for (var i = 0; i < board_state.length; i++) {
			board_state[i] = -1;
		}
	}
	else{
		return;
	}
}

/*
TODO - Rule 3
This is the last method you'll implement. This method is called everytime a move has been played( Play button was clicked).
The method should do all the things as stated in rule 2.
1. The moves should be validated can only be these ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
2. Invalid moves should be reported by an alert message.(You are encorraged to use Modal which you learned in HW1 - Usage is not mandatory.)
3. If the move is a valid move, the grid should be updated with the correct move (Player 1 is always - 'X', and Player 2 is always 'O' (This is not zero!)) - The turn information should also be updated
	Hint: Use the turn variable to figure out who is currently playing. Use to toggle method to change moves.
4. A move should always be a valid move. (Example: If say a move was made in already filled cell, it should be invalidated with an alert.)
5. If the game has not started, clicking on <b>Play</b> should give an alert "The game has not started."<br/>
6. After any move, the state of the table should be validated.(see the document attached in the homework)
   If the there is winner - Show it in an alert message - (Ex - Winner is X or O) - Displaying name is not important. <br/>
7. The game should reset itself once a winner is determined.<br/>
8. After all the moves have exhausted, you're not required to display any message. (It should be obvious to Reset play.)<br/>

*/
function play() {
	if (started == false){
		alert("The game has not started.");
		return;
	}
	var validMoves = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
	var playerMove = document.getElementById('move_text_id').value;
	if (validMoves.includes(playerMove) == false){
		alert("You typed an invalid move, please try again");
		return;
	}
	else{
		var found = false;
		var grid = document.getElementsByTagName('td');
		for (var i = 0; i < grid.length; i++) {
			if (grid[i].innerHTML == playerMove) {
				found = true;
				if (whose_move() == 0){ // player 2's turn
					grid[i].innerHTML = "O";
					updateBoardState(i, "O");
					break;
				}
				else{ // player 1's move
					grid[i].innerHTML = "X";
					updateBoardState(i, "X");
					break;
				}
			}
		}
		toggle_move();
		if (found == false){
			alert("This move was already made, please try again");
			return;
		}
	}
	if (turn == 1){
		document.getElementById('turn_info').innerHTML = "Turn for:  <b>X</b>";
	}
	else {
		document.getElementById('turn_info').innerHTML = "Turn for:  <b>O</b>";
	}

	document.getElementById('move_text_id').value = ""; // reset move field after each move
	var winner = checkWinner(); // check for a winner after each move
	if (winner == 1){ // we have a winner!
		alert(`${player1} wins!`);
		reset_play();
	}
	else if (winner == 2) {
		alert(`${player1} wins!`);
		reset_play();
	}
}

/*
Update bord state
*/
function updateBoardState(b_index, player){ // updates board_state variable
	if (player == "X"){
		board_state[b_index] = 1;
	}
	else{
		board_state[b_index] = 2;
	}
}

/*Checks for valid winner*/
function checkWinner(){
	var validWins = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	var winner = 0;
	for (var i = 0; i < validWins.length; i++) {
		var p1count = 0;
		var p2count = 0;
		for (var z = 0; z < validWins[i].length; z++) {
			if (board_state[validWins[i][z]] == 1){
				p1count += 1;
				if (p1count == 3){ // three moves in a row = win
					winner = 1;
					break;
				}
			}
			else if (board_state[validWins[i][z]] == 2) {
				p2count += 1;
				if (p2count == 3) { // three moves in a row = win
					winner = 2;
					break;
				}
			}
		}
	}
	return winner;
}

/*
Do not change this method.
*/
function moveEnter(event) {
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}
}
