//variables for navigation
var menu1 = document.getElementById("menu1");
var menu2 = document.getElementById("menu2");
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var clickSound = new Audio;
clickSound.src = "Sounds/click.wav";

//create navigation
button1.onclick = function(){
	clickSound.play();
	menu1.style.display = "none";
	//generation of the world
	CreateNewWorld();
	CreateSquares(coins,"coin");
	CreateSquares(keys,"key");
	TimerGame = setInterval(repeatForever,10);
	canlock = true;
}

button2.onclick = function(){
	clickSound.play();
	menu1.style.display = "none";
	menu2.style.display = "block";
}

button3.onclick = function(){
	clickSound.play();
	menu1.style.display = "block";
	menu2.style.display = "none";
}

function iteration(squares,string){
	for (let i = 0; i < squares.length; i++){
		let r = (squares[i][0] - pawn.x)**2 +
				(squares[i][1] - pawn.y)**2 +
				(squares[i][2] - pawn.z)**2;
		let r1 = squares[i][6]**2;
		//console.log(r,r1);
		if (r < r1) {
			document.getElementById(string + i).style.display = "none";
			squares[i][0] = 1000000;
			squares[i][1] = 1000000;
			squares[i][2] = 1000000;
		}
	}
}

function repeatForever(){
	update();
	iteration(coins,"coin");
	iteration(keys,"key");
}