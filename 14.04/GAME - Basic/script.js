//world constant
var deg = Math.PI/180;

function player(x,y,z,rx,ry){
	this.x = x;
	this.y = y;
	this.z = z;
	this.rx = rx;
	this.ry = ry;
}

//rectangle Array
var map = [
	[0,0,-1000,0,0,0,2000,200,"Patterns/wall1.png"],//front wall
	[0,0,1000,0,0,0,2000,200,"#F0C0FF"],// back wall
	[1000,0,0,0,90,0,2000,200,"#F0C0FF"],// right wall
	[-1000,0,0,0,90,0,2000,200,"#F0C0FF"],//left wall
	[0,100,0,90,0,0,2000,2000,"#666666"],//ground
	
	[0,0,-1000,0,0,0,83,180,"Patterns/door.png"]
	
]

var coins = [
	[300,30,-500,0,0,0,50,50,"#FFFF00",50],
	[-300,30,800,0,0,0,50,50,"#FFFF00",50],
	[-100,30,-200,0,0,0,50,50,"#FFFF00",50]
]

var keys = [
	[900,30,900,0,0,0,50,50,"#FF0000",50,20],
//	[100,30,-400,0,0,0,50,50,"#FF0000",50,20],
//	[-300,30,200,0,0,0,50,50,"#FF0000",50,20],
]

var finish = [
	[900,100,-900,90,0,0,200,200,"Patterns/portal.gif"]
]

var start = [
	[-900,0,-900,0,-150]
]

//variables for movement
var PressLeft = 0;
var PressRight = 0;
var PressForward = 0;
var PressBack = 0;
var PressUp = 0;
var MouseX = 0;
var MouseY = 0;
var lock = false;
var canlock = false;
var speed = 1;

//link variable to container
var container = document.getElementById("container");
//if the mouse ir pressed
container.onclick = function(){
	if (canlock) container.requestPointerLock();
}

//if the key is pressed
document.addEventListener("keydown",(event) =>{
	if (event.key == "w"){
		PressForward = 1;
	}
	if (event.key == "s"){
		PressBack = 1;
	}
	if (event.key == "d"){
		PressRight = 1;
	}
	if (event.key == "a"){
		PressLeft = 1;
	}
	if (event.key == " "){
		PressUp = 1;
	}
	if (event.key == "q"){
		speed = 5;
	}
})

//if the key is released
document.addEventListener("keyup", (event) =>{
	if (event.key == "w"){
		PressForward = 0;
	}
	if (event.key == "s"){
		PressBack = 0;
	}
	if (event.key == "d"){
		PressRight = 0;
	}
	if (event.key == "a"){
		PressLeft = 0;
	}
	if (event.key == " "){
		PressUp = 0;
	}
	if (event.key == "q"){
		speed = 1;
	}
})

//locked mouse listener
document.addEventListener("pointerlockchange", (event) =>{
	lock = !lock;
})

//mouse movement listener
document.addEventListener("mousemove", (event) =>{
	MouseX = event.movementX;
	MouseY = event.movementY;
})

var pawn = new player(0,0,0,0,0);
var world = document.getElementById("world");

function update(){
	//count movement
	dx = (Math.cos(pawn.ry * deg) * (PressRight - PressLeft) - 
		Math.sin(pawn.ry * deg) * (PressForward - PressBack)) * speed;
	dz = (- Math.sin(pawn.ry * deg) * (PressRight - PressLeft) -
		Math.cos(pawn.ry * deg) * (PressForward - PressBack)) * speed;
	//dx = PressRight - PressLeft;
	//dz = - (PressForward - PressBack);
	dy = - PressUp;
	drx = MouseY/4;
	dry = - MouseX/4;
	MouseY = MouseX = 0;
	
	
	//add movement to the coordinates
	pawn.x = pawn.x + dx;
	pawn.y = pawn.y + dy;
	pawn.z = pawn.z + dz;
	//if the mouse is locked
	if (lock){
		pawn.rx = pawn.rx + drx;
		pawn.ry = pawn.ry + dry;
	}
	
	//change coordinates of the world
	world.style.transform = "translateZ(600px)" +
							"rotateX(" + (-pawn.rx) + "deg)" +
							"rotateY(" + (-pawn.ry) + "deg)" +
							"translate3d(" + (-pawn.x) + "px," + (-pawn.y) + "px," + (-pawn.z) + "px)";
}

function CreateNewWorld(){
	CreateSquares(map,"map");
}

function clearWorld(){
	world.innerHTML = "";
}

function CreateSquares(squares,string){
	for (let i = 0; i < squares.length; i++){
		
		//create rectangles and styles 
		let newElement = document.createElement("div");
		newElement.className = string + " square";
		newElement.id = string + i;
		newElement.style.width = squares[i][6] + "px";
		newElement.style.height = squares[i][7] + "px";
		newElement.style.background = squares[i][8];
		newElement.style.backgroundImage =
					"url(" + squares[i][8] + ")";
		newElement.style.borderRadius = squares[i][9] +"%";
		newElement.style.boxShadow = "0 0 " + squares[i][10] + "px " + squares[i][8];
		newElement.style.transform = 
			"translate3d(" + 
			(600 - squares[i][6]/2 + squares[i][0]) + "px," + 
			(400 - squares[i][7]/2 + squares[i][1]) + "px," + 
			squares[i][2] + "px)" +
			"rotateX(" + squares[i][3] + "deg)" + 
			"rotateY(" + squares[i][4] + "deg)" + 
			"rotateZ(" + squares[i][5] + "deg)";
		
		//insert rectangles into the world
		world.append(newElement);
		
	}
}

