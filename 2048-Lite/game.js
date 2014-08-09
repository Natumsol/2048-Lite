var game = new brickgame(4,2048,"");
game.start();
game.paint();
var themes  = false;
function paintscore(){
	document.getElementById("score").innerHTML = "SCORE<br />" + game.score;
	document.getElementById("best").innerHTML = "BEST<br />" + game.highScore;
}
var handler = function(event){
	var keycode = event.keyCode;
	if(!game.isOver){
		if(keycode == 87 || keycode == 38){
			game.moveable('up');
			game.move('up');
			game.paint();
			paintscore();
			game.check();
			event.preventDefault();
		} 
		if(keycode == 83 || keycode == 40){
			game.moveable('down');
			game.move('down');
			game.paint();
			paintscore();
			game.check();
			event.preventDefault();
		} 
		if(keycode == 65 || keycode == 37){
			game.moveable('left');
			game.move('left');
			game.paint();
			paintscore();
			game.check();
			event.preventDefault();
		} 
		if(keycode == 68 || keycode == 39){
			game.moveable('right');
			game.move('right');
			game.paint();
			paintscore();
			game.check();
			event.preventDefault();
		} 

	}
}

document.addEventListener('keydown',handler,false);

