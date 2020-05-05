var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var x;
var drawx;
var drawy;

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function newStart(){
    Start();
	// document.getElementById("song").play();
	document.getElementById("song").currentTime = 0; // reset song
};
function Start() {
	drawx = 0;
	drawy = 2;
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 12; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 12; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;

			} 
			else if(i == 0 || j == 0 || i == 11 || j == 11){  // walls
				board[i][j] = 5; 
			}else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

// get keyboard parametrs from user instead the numbers
var up = 38;
var down = 40;
var left = 37;
var right = 39;

// UP
function getUpKey(){
	let dialog = document.querySelector('#upDialog');

	dialog.show();

	document.onkeydown = function(event){
		up = event.keyCode;
		document.getElementById('upSpan').innerHTML = String.fromCharCode(event.keyCode);
	}


	document.querySelector('#upClose').onclick = function() {
		dialog.close();
		}
}

// DOWN
function getDownKey(){
	let dialog = document.querySelector('#downDialog');

	dialog.show();

	document.onkeydown = function(event){
		down = event.keyCode;
		document.getElementById('downSpan').innerHTML = String.fromCharCode(event.keyCode);
	}


	document.querySelector('#downClose').onclick = function() {
		dialog.close();
	}
	
}

// LEFT
function getLeftKey(){
	let dialog = document.querySelector('#leftDialog');

	dialog.show();

	document.onkeydown = function(event){
		left = event.keyCode;
		document.getElementById('leftSpan').innerHTML = String.fromCharCode(event.keyCode);
	}


	document.querySelector('#leftClose').onclick = function() {
		dialog.close();
	}
}

// RIGHT
function getRightKey(){
	let dialog = document.querySelector('#rightDialog');

	dialog.show();

	document.onkeydown = function(event){
		right = event.keyCode;
		document.getElementById('rightSpan').innerHTML = String.fromCharCode(event.keyCode);
	}


	document.querySelector('#rightClose').onclick = function() {
		dialog.close();
	}
}
function GetKeyPressed() {
	console.log(keysDown);
	
	// Up
	if (keysDown[up]) {
		return 1;
	}

	// Down
	if (keysDown[down]) {
		return 2;
	}

	// Left
	if (keysDown[left]) {
		return 3;
	}

	// Right
	if (keysDown[right]) {
		return 4;
	}
}


function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 12; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				if(x == 1){
					drawx = 1.45;
					drawy = 1.25;
				}else if(x == 2){
					context.arc(center.x, center.y, 30,  0.65*Math.PI, 0.15*Math.PI); // half circle
					drawx = 0.65;
					drawy = 0.15;
				}else if(x == 3){
					context.arc(center.x, center.y, 30,  1.3*Math.PI, 0.8*Math.PI); // half circle
					drawx = 1.3;
					drawy = 0.8;
				}else if(x == 4){
					context.arc(center.x, center.y, 30,  0.15*Math.PI, 1.85*Math.PI); // half circle
					drawx = 0.15;
					drawy = 1.85;
				}

				context.arc(center.x, center.y, 30,  drawx*Math.PI, drawy*Math.PI); // half circle

				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 5) { // walls
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 50, 50);
				context.fillStyle = "black"; //color
				context.fill();
			}
		}
	}
}

//updated the if conditions to suit the walls
function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	x = GetKeyPressed();
	if (x == 1) { //up
		if (shape.j > 1 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) { //down
		if (shape.j < 10 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) { //left
		if (shape.i > 1 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) { //right
		if (shape.i < 10 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}


