var context;
var shape = new Object();
var board;
var score;
var loses;
var maxLoses;
var pac_color;
var start_time;
var time_elapsed;
var maxTime;
var timer;
var interval;
var x;
var drawx = 0.15;
var drawy = 1.85;
var monsters;
var amountMonsters;
var amountCircles;
var bonusIndexes;
var indexBonus;
var drug;
var timeCounter = 0;

$(document).ready(function() {
	context = canvas.getContext("2d");
	//Start();
	
});

// board[i][j]:
// 0 - empty
// 1 - food 5 scores
// 2 - pacman
// 3 - drug
// 4 - obstacles
// 5 - walls
// 15 - food 15 scores
// 25 - food 25 scores

function startGame(){
	document.querySelector('#newGameButton').disabled = true;

	document.querySelector('#end').close();

    $(".page").css("visibility","hidden");
    $(".homepage").css("visibility","hidden");
    $(".game").css("visibility","visible");
    $(".game").css("position","absolute");
    document.getElementsByClassName("balls")[1].innerHTML = document.getElementsByClassName("balls")[0].innerHTML;
    document.getElementsByClassName("time")[1].innerHTML = document.getElementsByClassName("time")[0].value;
    document.getElementsByClassName("monsters")[1].innerHTML = document.getElementsByClassName("monsters")[0].innerHTML;
    document.getElementsByClassName("sixty")[1].value = document.getElementsByClassName("sixty")[0].value;
    document.getElementsByClassName("thirty")[1].value = document.getElementsByClassName("thirty")[0].value;
	document.getElementsByClassName("ten")[1].value = document.getElementsByClassName("ten")[0].value;
	
	document.getElementById("song").currentTime = 0; // reset song
	document.getElementById("song").play(); 
	
	Start();

	document.querySelector('#stopGameButton').disabled = false;
};


function stopGame(){
	document.querySelector('#stopGameButton').disabled = true;

	clearInterval(interval);
	interval = null;

	document.querySelector('#end').close();
	document.getElementById("song").pause(); // reset song

	document.getElementsByClassName("time")[1].disabled = true;

	document.querySelector('#newGameButton').disabled = false;
}

/*
function stopGame(){
	document.querySelector('#end').close();
	clearInterval(interval);
	document.getElementById("song").pause(); // reset song
	// document.getElementsByClassName("time")[1].innerHTML = 0;
	document.getElementsByClassName("time")[1].disabled = true;
	time_elapsed = 0;
	document.querySelector('#newGameButton').disabled = false;
};
*/

function Start() {
	amountCircles = document.getElementsByClassName("balls")[1].innerHTML;
	board = new Array();
	time_elapsed = 0;
	score = 0;
	loses = 0;
	maxLoses = 5;
	maxTime = parseInt(document.getElementsByClassName("time")[0].value);
	pac_color = "yellow";
	amountMonsters = document.getElementById('gameMonsters').value;
	var cnt = 99;
	var food_remain = document.getElementById('gameBalls').value;
	var pacman_remain = 1;

	// food with scores 5: 60%, 15: 30%, 25: 10%
	let ballArray = [1, 15, 25];
	let ball_5_remain = food_remain * 0.6
	let ball_15_remain = food_remain * 0.3
	let ball_25_remain = food_remain * 0.1

	start_time = new Date();
	for (var i = 0; i < 12; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 12; j++) {
			if(i == 0 || j == 0 || i == 11 || j == 11){  // walls
				board[i][j] = 5; // walls
			}
			else if (
				// (i == 3 && j == 3) ||
				// (i == 3 && j == 4) ||
				// (i == 3 && j == 5) ||
				// (i == 6 && j == 1) ||
				// (i == 6 && j == 2)
				2 + Math.floor(Math.random() * 10) == i && 
				cnt - food_remain > 1
			) {
				board[i][j] = 4; // obstacles
				cnt--;
			} else {
				var randomNum = Math.random();
				var ball;

				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;

					// choose the ball by per cent
					while(ball_5_remain > 0 || ball_15_remain > 0 || ball_25_remain > 0){
						ball = ballArray[Math.floor(Math.random() * ballArray.length)];
						if(ball == 1 && ball_5_remain > 0){
							ball_5_remain--;
							break;
						}
						else if(ball == 15 && ball_15_remain > 0){
							ball_15_remain--;
							break;
						}
						else if(ball == 25 && ball_25_remain > 0){
							ball_25_remain--;
							break;
						}
					}

					board[i][j] = ball;
				} 
				/*
				else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2; // pac
				} 
				*/
				else {
					board[i][j] = 0; // empty
				}
				cnt--;
			}
		}
	}

	// monsters
	monsters = [
		{i:1, j:1, img: 'blue.png'},
		{i:1, j:10, img: 'grey.png'},
		{i:10, j:1, img: 'pink.png'},
		{i:10, j:10, img: 'red.png'}
	]

	// bonus
	bonusIndexes = [
		{i: 1, j:2, draw: true},
		{i: 1, j:9, draw: true},
		{i: 10, j:2, draw: true},
		{i: 10, j:9, draw: true},
	]
	indexBonus = bonusIndexes[Math.floor(Math.random() * bonusIndexes.length)];

	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		// choose the ball by per cent
		while(ball_5_remain > 0 || ball_15_remain > 0 || ball_25_remain > 0){
			ball = ballArray[Math.floor(Math.random() * ballArray.length)];
			if(ball == 1 && ball_5_remain > 0){
				ball_5_remain--;
				break;
			}
			else if(ball == 15 && ball_15_remain > 0){
				ball_15_remain--;
				break;
			}
			else if(ball == 25 && ball_25_remain > 0){
				ball_25_remain--;
				break;
			}
		}
		board[emptyCell[0]][emptyCell[1]] = ball;
		food_remain--;
	}

	// drug
	let indexesDrug = [findRandomEmptyCellDrug(board), findRandomEmptyCellDrug(board), findRandomEmptyCellDrug(board)];
	drug = [ 
			{i: indexesDrug[0][0], j: indexesDrug[0][1], draw: true },
			{i: indexesDrug[1][0], j: indexesDrug[1][1], draw: true },
			{i: indexesDrug[2][0], j: indexesDrug[2][1], draw: true },
	];
	board[indexesDrug[0][0]][indexesDrug[0][1]] = 3;
	board[indexesDrug[1][0]][indexesDrug[1][1]] = 3;
	board[indexesDrug[2][0]][indexesDrug[2][1]] = 3;

	// drug
	let indexesTimer = [findRandomEmptyCellTimer(board), findRandomEmptyCellTimer(board), findRandomEmptyCellTimer(board)];
	timer = [ 
			{i: indexesTimer[0][0], j: indexesTimer[0][1], draw: true },
			{i: indexesTimer[1][0], j: indexesTimer[1][1], draw: true },
			{i: indexesTimer[2][0], j: indexesTimer[2][1], draw: true },
	];
	
	// Place pacman
	shape.i = 0;
	shape.j = 0;
	
	while(shape.i == 0 && shape.j == 0)	{
		let i = Math.floor(Math.random() * 9 + 1);
		let j = Math.floor(Math.random() * 9 + 1);

		// Monsters
		for (let n = 0; n < amountMonsters; n++){
			if(i == monsters[n].i && j == monsters[n].j){
				continue;
			}
		}

		board[i][j] = 0;
		shape.i = i;
		shape.j = j;
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

	interval = setInterval(UpdatePosition, 100);

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

function findRandomEmptyCellDrug(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 1) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function findRandomEmptyCellTimer(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 1 || board[i][j] == 3) {
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

	dialog.showModal();

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

	dialog.showModal();

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

	dialog.showModal();

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

	dialog.showModal();

	document.onkeydown = function(event){
		right = event.keyCode;
		document.getElementById('rightSpan').innerHTML = String.fromCharCode(event.keyCode);
	}


	document.querySelector('#rightClose').onclick = function() {
		dialog.close();
	}
}
function GetKeyPressed() {
	//console.log(keysDown);
	
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
	lblLose.value = loses;
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 12; j++) {
			var center = new Object();
			var top = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			top.x = i * 60;
			top.y = j * 60;


			if (board[i][j] == 2) {
				context.beginPath();
				if(x == 1){
					drawx = 1.45;
					drawy = 1.25;
					//context.arc(center.x, center.y, 30,  1.65*Math.PI, 1.35*Math.PI); // half circle

				}else if(x == 2){
					//context.arc(center.x, center.y, 30,  0.65*Math.PI, 0.35*Math.PI); // half circle
					drawx = 0.65;
					drawy = 0.15;
				}else if(x == 3){
					//context.arc(center.x, center.y, 30,  1.15*Math.PI, 0.35*Math.PI); // half circle
					drawx = 1.3;
					drawy = 0.8;
				}else if(x == 4){
					//context.arc(center.x, center.y, 30,  0.85*Math.PI, 1.15*Math.PI); // half circle
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

			} 
			// score 5
			else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = document.getElementsByClassName("sixty")[1].value; //color
				context.fill();
			} 
			// score 15
			else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = document.getElementsByClassName("thirty")[1].value; //color
				context.fill();
			}
			// score 25
			else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = document.getElementsByClassName("ten")[1].value; //color
				context.fill();
			}
			else if (board[i][j] == 4) {
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


			// monsters
			for (var n = 0; n < amountMonsters; n++){
				if(i == monsters[n].i && j == monsters[n].j){
					let ghost = document.createElement("img");
					ghost.setAttribute('src', monsters[n].img);
	
					context.drawImage(ghost, top.x, top.y);
				}
			}

		}
		
	}

	// bonus khaleesi
	if(indexBonus.draw){
		let khaleesi = document.createElement("img");
		khaleesi.setAttribute('src', "khaleesi.png");
		
		context.drawImage(khaleesi, indexBonus.i * 60, indexBonus.j * 60);
	}

	// drug
	for(let d = 0; d < drug.length; d++){
		if(drug[d].draw){
			let drugImg = document.createElement("img");
			drugImg.setAttribute('src', "drug.png");
			
			context.drawImage(drugImg, drug[d].i * 60, drug[d].j * 60);
		}
	}

	// timer
	for(let t = 0; t < timer.length; t++){
		if(timer[t].draw){
			let timerImg = document.createElement("img");
			timerImg.setAttribute('src', "timer.png");
			
			context.drawImage(timerImg, timer[t].i * 60, timer[t].j * 60);
		}
	}

}

var UpdatePositionCnt = 0;
//updated the if conditions to suit the walls
function UpdatePosition() {
	
	if (UpdatePositionCnt > 0){
		return;
	}
	UpdatePositionCnt++;

	timeCounter++;

	board[shape.i][shape.j] = 0;
	x = GetKeyPressed();
	// console.log(x);
	
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

	// Move monster and bonus
	if (timeCounter % 5 == 0){ // speed of changing place
		// Move monster
		for (var n = 0; n < amountMonsters; n++){
		
			let newI;
			if(monsters[n].i < shape.i){
				newI = monsters[n].i + 1;
			}
			else if (monsters[n].i > shape.i) {
				newI = monsters[n].i - 1;
			}
			else 
			{
				newI = monsters[n].i;
			}
	
			if(board[newI][monsters[n].j] != 4)
			{
				monsters[n].i = newI;
			}
	
			let newJ;
			if(monsters[n].j < shape.j){
				newJ = monsters[n].j + 1;
			}
			else if (monsters[n].j > shape.j) {
				newJ = monsters[n].j - 1;
			}
			else 
			{
				newJ = monsters[n].j;
			}
	
			if(board[monsters[n].i][newJ] != 4)
			{
				monsters[n].j = newJ;
			}
		}


		
		// Move bonus
		if(indexBonus.draw){
			let newI_Bonus;
			let newJ_Bonus;

			while(true){
				newI_Bonus = Math.floor(Math.random() * 10) + 1;
				newJ_Bonus = Math.floor(Math.random() * 10) + 1;

				if(board[newI_Bonus][newJ_Bonus] != 4){
					break;
				}
			}

			indexBonus.i = newI_Bonus;
			indexBonus.j = newJ_Bonus;
		}
		else{
			indexBonus.i = 0;
			indexBonus.j = 0;
		}
		
		

	}

	// Check pacman-monster collision
	for (var n = 0; n < amountMonsters; n++){
		if(shape.i == monsters[n].i && shape.j == monsters[n].j){
			console.log("BOOM!");
			score -= 10;
			loses++;
			
			if(loses == maxLoses){
				stopGame();
				document.getElementById("gameResult").innerHTML = "Loser!";
				let dialog = document.querySelector('#end');
				dialog.showModal();
			}

			let i; let j;
			// random recure pac
			while(true){
				let isMonster = false;
				i = Math.floor(Math.random() * 10) + 1;
				j = Math.floor(Math.random() * 10) + 1;
				for (var n = 0; n < amountMonsters; n++){
					if(i == monsters[n].i && j == monsters[n].j){
						isMonster = true;
					}
				}
				if(board[i][j] != 4 && !isMonster){
					shape.i = i;
					shape.j = j;
					break;
				}
			}
			
		}
	}

	// Check pacman-bonus collision
	if(shape.i == indexBonus.i && shape.j == indexBonus.j){
		score += 50;
		indexBonus.draw = false;
	}

	// eat drug
	for(let d = 0; d < drug.length; d++){
		if(shape.i == drug[d].i && shape.j == drug[d].j && drug[d].draw){
			drug[d].draw = false;

			if(loses > 0){
				loses--;
			}

		}
	}

	// timer drug
	for(let t = 0; t < timer.length; t++){
		if(shape.i == timer[t].i && shape.j == timer[t].j && timer[t].draw){
			timer[t].draw = false;

			maxTime += 5;
			document.getElementsByClassName("time")[1].innerHTML = maxTime;

		}
	}

	// score
	if (board[shape.i][shape.j] == 1) {
		score = score + 5;
		amountCircles--;
	}
	else if(board[shape.i][shape.j] == 15){
		score = score + 15;
		amountCircles--;
	}
	else if(board[shape.i][shape.j] == 25){
		score = score + 25;
		amountCircles--;
	}

	board[shape.i][shape.j] = 2;

	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

	if(time_elapsed >=  maxTime ){
		stopGame();
		document.getElementById("lblTime").value = document.getElementsByClassName("time")[0].value;
		if(score < 100){
			document.getElementById("gameResult").innerHTML = "You are better than "+ score +" points!";

		}else{
			document.getElementById("gameResult").innerHTML = "Winner!!!";
		}
        let dialog = document.querySelector('#end');
		dialog.showModal();
	}

	if (score >= 50 && time_elapsed <= 10) {
		pac_color = "green";
	}

	Draw();

	if(score >= 100){
		stopGame();

		document.getElementById("gameResult").innerHTML = "Winner!!!";
		let dialog = document.querySelector('#end');
		dialog.showModal();
		
		UpdatePositionCnt--;
		return;
	}

	UpdatePositionCnt--;
	console.log(UpdatePositionCnt);
}
