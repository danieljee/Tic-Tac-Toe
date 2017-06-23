var gameOver = false;
var onePlayer;
var player1Turn;
var player1;
var player2;
var boxList = []; //should contain actual td objects
var availableBoxes = []; //should contain ids
var player1win = false;
var draw = false;
var player1list = [];
var player2list = [];

document.addEventListener("DOMContentLoaded", function(){
	contentDiv = document.getElementById("contents");
	document.getElementById("onePlayer").addEventListener("click", nextPage);
	document.getElementById("twoPlayer").addEventListener("click", nextPage);
});

var nextPage = function(){
	var back = document.createElement("a");
	back.href = '';
	back.innerHTML = "Back";
	back.addEventListener("click", nextPage);
	contentDiv.style.opacity = '0';
	event.preventDefault();
	setTimeout(()=>{
		if (this.innerHTML === "Back"){
			contentDiv.innerHTML = "<h1>SELECT:</h1><a href='' id='onePlayer'>One Player</a><br><br><a href='' id='twoPlayer'>Two Player</a>";
		}else {
			if (this.innerHTML === "One Player"){
				onePlayer = true;
				contentDiv.innerHTML = "<h1>Would you like to be X or O?</h1><a href='' id='x'>X</a><a href='' id='o'>O</a><br><br>";
			} else {
				onePlayer = false;
				contentDiv.innerHTML = "<h1>Would player 1 like to be X or O?</h1><a href='' id='x'>X</a><a href='' id='o'>O</a><br><br>";			
			}
			contentDiv.appendChild(back);
			document.getElementById("x").addEventListener("click", playerChosen);
			document.getElementById("o").addEventListener("click", playerChosen);
		}		
		contentDiv.style.opacity = '1';
	 }, 1000);
}

var playerChosen = function(){
	if (player1 == undefined){
		player1 = this.innerHTML;
	} 
	contentDiv.style.opacity = '0';
	event.preventDefault();
	var grid = document.createElement("div");
	grid.setAttribute("style", "width:300px; height: 300px; margin:30px auto;");
	grid.innerHTML = "<table><tr><td id='0' class='gridBlock' style='width:100px; height:100px;'></td><td id='1' class='gridBlock' style='width:100px; height:100px;'></td><td id='2' class='gridBlock' style='width:100px; height:100px;'></td></tr>"+
								"<tr><td id='3' class='gridBlock' style='width:100px; height:100px;'></td><td id='4' class='gridBlock' style='width:100px; height:100px;'></td><td id='5' class='gridBlock' style='width:100px; height:100px;'></td></tr>"+
								"<tr><td id='6' class='gridBlock' style='width:100px; height:100px;'></td><td id='7' class='gridBlock' style='width:100px; height:100px;'></td><td id='8' class='gridBlock' style='width:100px; height:100px;'></td></tr></table>";
	setTimeout(()=>{
		if (onePlayer){
			contentDiv.innerHTML = "<h5>Player:<span id='player1Score'></span>Computer:<span id='computerScore'></span></h5>";
		} else if (!onePlayer) {
			contentDiv.innerHTML = "<h5>Player 1:<span id='player1Score'></span>Player 2:<span id='player2Score'></span></h5>";
		}	
		player1 ==='X'? player2='O': player2='X';
		contentDiv.appendChild(grid);
		var boxes = document.getElementsByClassName('gridBlock');	
		for(var i=0; i<boxes.length; i++){
			boxList.push(boxes[i]);
			availableBoxes.push(+boxes[i].id);
			boxes[i].addEventListener("click", function(){
				 if (this.innerHTML === "" && !gameOver){
					if (player1Turn){
						this.innerHTML = player1;
						player1list.push(+this.id);
						player1Turn = !player1Turn;
					} else {
						this.innerHTML = player2;
						player2list.push(+this.id);
						player1Turn = !player1Turn;
					}
					availableBoxes.splice(availableBoxes.indexOf(+this.id), 1)[0];	
					checkIfGameOver(player1list);
					checkIfGameOver(player2list);
				}
				if(availableBoxes.length == 0){
					draw = true;
					gameOver = true;
				}
				if(gameOver){
					gameover();
				}
				nextTurn();
			});
		}
		contentDiv.style.opacity = '1';
	}, 1000);
	if (Math.floor(Math.random() * 2) == 0){
		player1Turn = true;
	} else {
		player1Turn = false;
	}
	
	nextTurn();		
}

var nextTurn = function(){
	if (player1Turn){
		console.log("player1's turn");
	} else {
		console.log("player2's turn");
	}
	
	if (!player1Turn && onePlayer){
		setTimeout(function(){		
			computerMove();
		}, 1000);		
	}
}

var computerMove = function(){
	if (availableBoxes.length == 9){	//computer starting first. Place on the center or one of other 4 corners
		var boxNum = [0,2,4,6,8][Math.floor(Math.random() * 5)];
		boxList[boxNum].innerHTML = player2;
		player2list.push(availableBoxes.splice(availableBoxes.indexOf(boxNum), 1)[0]);	
	} else if (availableBoxes.length == 8) { //player starts first
		if (availableBoxes.includes(4)){//if the center is empty
			var boxNum = 4;
			boxList[boxNum].innerHTML = player2;
			player2list.push(availableBoxes.splice(availableBoxes.indexOf(boxNum), 1)[0]);
		} else {
			var boxNum = [0,2,6,8][Math.floor(Math.random() * 4)];
			boxList[boxNum].innerHTML = player2;
			player2list.push(availableBoxes.splice(availableBoxes.indexOf(boxNum), 1)[0]);
		}
	} else if (availableBoxes.length == 7) {
		if (player2list.includes(4)){ //if computer has taken the center
			var boxNum = availableBoxes.splice(Math.floor(Math.random() * availableBoxes.length), 1)[0];
			boxList[boxNum].innerHTML = player2;
			player2list.push(boxNum);
		} else if (player1list.includes(4)){ //if the player has taken the center
			if (player2list[0] == 0){
				boxList[8].innerHTML = player2; //take the opposite corner
				player2list.push(availableBoxes.splice(availableBoxes.indexOf(8), 1)[0]);
			} else if (player2list[0] == 2){
				boxList[6].innerHTML = player2; //take the opposite corner
				player2list.push(availableBoxes.splice(availableBoxes.indexOf(6), 1)[0]);
			} else if (player2list[0] == 6){
				boxList[2].innerHTML = player2; //take the opposite corner
				player2list.push(availableBoxes.splice(availableBoxes.indexOf(2), 1)[0]);
			} else if (player2list[0] == 8){
				boxList[0].innerHTML = player2; //take the opposite corner
				player2list.push(availableBoxes.splice(availableBoxes.indexOf(0), 1)[0]);
			}
		} else {//if the center is empty
			boxList[4].innerHTML = player2;
			player2list.push(4);
		}
	} else {//for the rest of the game,
		filltheblank(player1list, player2list);
		if (!gameOver){//if none found, find if the player has any 
			filltheblank(player2list, player1list);
			if (player1Turn == false){
				var boxNum = availableBoxes.splice(Math.floor(Math.random() * availableBoxes.length), 1);
				boxList[boxNum].innerHTML = player2;
				player2list.push(boxNum);
			}
		}
	}
	
	player1Turn = true;
	console.log("player1's turn");
	if(availableBoxes.length == 0){
		gameOver = true;
		draw = true;
	}
	
	if (gameOver){
		gameover();
	}
}

 var filltheblank = function(playerlist1, playerlist2){	 
	 for(var i = 0; i<playerlist2.length && !gameOver; i++){
		if (playerlist2.includes(playerlist2[i]+3) && !playerlist1.includes(playerlist2[i] + 6) && !playerlist1.includes(playerlist2[i] - 3)){ //vertically
			if (playerlist2[i] <= 2){
				boxList[playerlist2[i] + 6].innerHTML = player2;
				player2list.push(availableBoxes.splice(availableBoxes.indexOf(playerlist2[i] + 6),1)[0]);
				if (playerlist2 == player2list) {gameOver = true; console.log("gameover");} else {player1Turn = true;}
			} else {
				boxList[playerlist2[i] - 3].innerHTML = player2;
				player2list.push(availableBoxes.splice(availableBoxes.indexOf(playerlist2[i] - 3),1)[0]);
				if (playerlist2 == player2list) {gameOver = true; console.log("gameover");} else {player1Turn = true;}
			}
		} else if (playerlist2.includes(playerlist2[i]+6) && !playerlist1.includes(playerlist2[i] + 3)){ //vertically but 1 space apart
			boxList[playerlist2[i] + 3].innerHTML = player2;
			player2list.push(availableBoxes.splice(availableBoxes.indexOf(playerlist2[i] + 3),1)[0]);
			if (playerlist2 == player2list) {gameOver = true; console.log("gameover");} else {player1Turn = true;}
		} else if (playerlist2.includes(playerlist2[i] + 1) && (playerlist2[i]  == 0 ||playerlist2[i]  == 3 || playerlist2[i]  == 6) && !playerlist1.includes(playerlist2[i] + 2)){ //horizontally
			boxList[playerlist2[i] + 2].innerHTML = player2;
			player2list.push(availableBoxes.splice(availableBoxes.indexOf(playerlist2[i] + 2),1)[0]);
			if (playerlist2 == player2list) {gameOver = true; console.log("gameover");} else {player1Turn = true;}
		} else if (playerlist2.includes(playerlist2[i] + 1) && (playerlist2[i]  == 1 ||playerlist2[i]  == 4 || playerlist2[i]  == 7) && !playerlist1.includes(playerlist2[i] - 1)){
			boxList[playerlist2[i] - 1].innerHTML = player2;
			player2list.push(availableBoxes.splice(availableBoxes.indexOf(playerlist2[i] - 1),1)[0]);
			if (playerlist2 == player2list) {gameOver = true; console.log("gameover");} else {player1Turn = true;}
		} else if (playerlist2.includes(playerlist2[i] + 2) && (playerlist2[i]  == 0 ||playerlist2[i]  == 3 || playerlist2[i]  == 6) && !playerlist1.includes(playerlist2[i] + 1)){//horizontally but 1 space apart
			boxList[playerlist2[i] + 1].innerHTML = player2;
			player2list.push(availableBoxes.splice(availableBoxes.indexOf(playerlist2[i] + 1),1)[0]);
			if (playerlist2 == player2list) {gameOver = true; console.log("gameover");} else {player1Turn = true;}
		}else if (playerlist2.includes(playerlist2[i] + 4) && playerlist2[i]  == 0 && !playerlist1.includes(playerlist2[i] + 8)){ //diagonally
			boxList[playerlist2[i] + 8].innerHTML = player2;
			player2list.push(availableBoxes.splice(availableBoxes.indexOf(playerlist2[i] + 8),1)[0]);
			if (playerlist2 == player2list) {gameOver = true; console.log("gameover");} else {player1Turn = true;}
		} else if (playerlist2.includes(playerlist2[i] + 4) && playerlist2[i]  == 4 && !playerlist1.includes(playerlist2[i] - 4)) {
			boxList[playerlist2[i] - 4].innerHTML = player2;
			player2list.push(availableBoxes.splice(availableBoxes.indexOf(playerlist2[i]  - 4),1)[0]);
			if (playerlist2 == player2list) {gameOver = true; console.log("gameover");} else {player1Turn = true;}
		} else if (playerlist2.includes(playerlist2[i] + 4) && playerlist2[i]  == 2 && !playerlist1.includes(playerlist2[i] + 2)){ //diagonally but from 2 to 6
			boxList[playerlist2[i] + 2].innerHTML = player2;
			player2list.push(availableBoxes.splice(availableBoxes.indexOf(playerlist2[i] + 2),1)[0]);
			if (playerlist2 == player2list) {gameOver = true; console.log("gameover");} else {player1Turn = true;}
		}else if (playerlist2.includes(playerlist2[i] + 8) && !playerlist1.includes(playerlist2[i] + 4)){ //diagonally but 1 space apart
			boxList[playerlist2[i] + 4].innerHTML = player2;
			player2list.push(availableBoxes.splice(availableBoxes.indexOf(playerlist2[i] + 4),1)[0]);
			if (playerlist2 == player2list) {gameOver = true; console.log("gameover");} else {player1Turn = true;}
		} else if (playerlist2.includes(playerlist2[i] + 2) && playerlist2[i]  == 2 && !playerlist1.includes(playerlist2[i] + 4)){
			boxList[playerlist2[i] + 4].innerHTML = player2;
			player2list.push(availableBoxes.splice(availableBoxes.indexOf(playerlist2[i] + 4),1)[0]);
			if (playerlist2 == player2list) {gameOver = true; console.log("gameover");} else {player1Turn = true;}
		} else if (playerlist2.includes(playerlist2[i] + 2) && playerlist2[i]  == 4 && !playerlist1.includes(playerlist2[i] -2)){
			boxList[playerlist2[i] - 2].innerHTML = player2;
			player2list.push(availableBoxes.splice(availableBoxes.indexOf(playerlist2[i] - 2),1)[0]);
			if (playerlist2 == player2list) {gameOver = true; console.log("gameover");} else {player1Turn = true;}
		}
	}
 }	
 
 function checkIfGameOver(list){
	 var line1 = list.includes(0) &&  list.includes(1) &&  list.includes(2);
	 var line2 = list.includes(3) &&  list.includes(4) &&  list.includes(5);
	 var line3 = list.includes(6) &&  list.includes(7) &&  list.includes(8);
	 var line4 = list.includes(0) &&  list.includes(3) &&  list.includes(6);
	 var line5 = list.includes(1) &&  list.includes(4) &&  list.includes(7);
	 var line6 = list.includes(2) &&  list.includes(5) &&  list.includes(8);
	 var line7 = list.includes(0) &&  list.includes(4) &&  list.includes(8);
	 var line8 = list.includes(2) &&  list.includes(4) &&  list.includes(6);

	 if (line1 || line2 || line3||line4||line5||line6||line7||line8){
		 gameOver = true;
		 if (list == player1list){
			 player1win = true;
		 }
	 }
 }
 
 function reset(){
	gameOver = false;
	boxList = [];
	availableBoxes = [];
	player1win = false;
	player1list = [];
	player2list = [];
	draw = false;
 }
 
 function gameover(){
	contentDiv.style.opacity = '0';
	setTimeout(()=>{
		if (draw){
			contentDiv.innerHTML = "<h1>Draw!</h1><a href='' id='retry'>Try Again</a><a href='' id='reset'>Reset</a><br><br>";	
		} else {
			if (player1win){
			contentDiv.innerHTML = "<h1>Player 1 wins!</h1><a href='' id='retry'>Try Again</a><a href='' id='reset'>Reset</a><br><br>";	
			} else {
				contentDiv.innerHTML = "<h1>Player 2 wins!</h1><a href='' id='retry'>Try Again</a><a href='' id='reset'>Reset</a><br><br>";	
			}
		}
		
		document.getElementById("retry").addEventListener('click',function(){
			reset();
			playerChosen();
		});
		document.getElementById("reset").addEventListener('click',function(){
			reset();
			player1 == undefined;
			contentDiv.innerHTML = "<h1>SELECT:</h1><a href='' id='onePlayer'>One Player</a><br><br><a href='' id='twoPlayer'>Two Player</a>";
		});
		contentDiv.style.opacity = '1';
	 }, 1000);
 }