/*@Description:the reimplement of the game -- 2048-Lite;
*@Author:Yoghurt;
*@blog:http://blog.natumsol.com;
*@Email:natumsol@gmail.com;
*@Data:July 28 2014
*/
function brickgame(level,end,mode){
	this.level = level;	// level means the game's size id level * level;
	this.end = end;	//it can be 1024,2048,9046...,enter -1 means no limit;
	this.mode = mode;	//mode can be 'classic','practice' ,'survial';
	this.score = 0;
	this.highScore = 0;
	this.isOver = false;
	this.needNewBrick = true;
	this.winOrFalse = "";
	this.brick = new Array();
	this.undone = new Array();
	this.steps = 0;
	this.lastScore =  new Array();;
	this.isMoveable = 0xf;//1000 means can 'up',0100 means can 
	//'down',0010 menas can 'left',0001 means can 'right',1111 means can //move to all direction.
}

brickgame.prototype.init = function(){
	for(var i = 0; i < this.level; i ++){
		this.brick[i] = new Array();
		for(var j = 0; j < this.level; j ++){
			this.brick[i][j] = new Object();	
			this.brick[i][j].value = 0;
			this.brick[i][j].type = "";
		}
	}
};// Initialize game;

brickgame.prototype.check = function(){
	var end = this.end;
	for(var i = 0 ; i < this.level;i ++){
		this.isOver = this.isOver || this.brick[i].some(function(
			item,index,array){
		return item.value === end;
		})
	}
	
	if(this.isOver){
		this.winOrFalse = "win";
		document.getElementById('game').innerHTML = "<div id = 'win'>You Win  !</div>"

		return;
	}// if there is brick which is equal to this.end,game over;
	for(var i = 0 ; i < this.level; i ++){
		if(this.brick[i].some(function(item,index,array){
			return item.value === 0; 
		})) {
			this.isOver = false;
			return;
		}//if there is still zero brick ,game continue;
	}

	for(var i = 0; i < this.level; i ++){
		for(var j = 0; j < this.level - 1; j ++){
			if(this.brick[i][j].value == this.brick[i][j + 1].value){
				this.isOver = false;
				return;
			}
		}
		for(var j = 0; j < this.level - 1; j ++){
			if(this.brick[j][i].value == this.brick[j + 1][i].value){
				this.isOver = false;
				return;
			}
		}
	}// 如果有两个相邻的方块，则游戏未结束;

/* if program run to here, it means the game is over becauseof the mistakes of the player;*/
this.isOver = true;
console.log('You lose,sucker!!');
document.getElementById('game').innerHTML = "<div id = 'end'>You Lose !</div>"
};

brickgame.prototype.generateBrick = function(){
	if(this.needNewBrick){
		do{
			var row = Math.floor((Math.random()) * this.level); 
			var col = Math.floor((Math.random()) * this.level); 
		}//generate random coordinate;
		while(this.brick[row][col].value != 0)
		
		var rand = Math.floor(Math.random() * 10 + 1)//generate ramdom num between 1-10;
		if(rand  < 7){
			this.brick[row][col].value = 2;
			this.brick[row][col].type = 'new';

		} else {
			this.brick[row][col].value = 4;
			this.brick[row][col].type = 'new';
		} // possibility for generate 2 is 6/10,4 is 4/10;
	}
}

brickgame.prototype.move = function(pos){
	this.lastScore[this.steps] = 0;
	var brickTemp = new Array();// temp for move
	var i, j, k;
	for(i = 0 ; i < this.level; i ++){
		brickTemp[i] = new Array();
		for(j = 0; j < this.level; j ++){
			brickTemp[i][j] = {
				value:0,
				type:''
			};

		}
	}

this.undone[this.steps] = new Array();


for(i = 0; i < this.level; i ++){
	this.undone[this.steps][i] = new Array();
	for(j = 0; j < this.level; j ++){
		this.undone[this.steps][i][j] = new Object();
		this.undone[this.steps][i][j].value = this.brick[i][j].value;
		this.undone[this.steps][i][j].type = '';
	}
}
// save old data for undoning..


	switch(pos){
		case "up":{
			if(this.isMoveable & 0x8)
			{	
				for(i = 0 ; i < this.level; i ++){

					for(j = 0,k = 0; j < this.level; j ++){
						brickTemp[k][i].value = this.brick[j][i].value ? (k ++,this.brick[j][i].value) : 0;
					}// clear zero for each clo

					for(j = 0; j < this.level - 1; j ++){
						if(brickTemp[j][i].value == brickTemp[j + 1][i].value && brickTemp[j][i].value){
							brickTemp[j][i].value *= 2;
							brickTemp[j][i].type = 'merge';
							brickTemp[j + 1][i].value = 0;
							this.lastScore[this.steps] += brickTemp[j][i].value;
							this.score += brickTemp[j][i].value;// compute score
						}
					}// merge

					for(j = 0,k = 0; j < this.level; j ++){
						this.brick[j][i].value = 0;
						this.brick[j][i].type = brickTemp[j][i].type;//clear old data
						this.brick[k][i].value = brickTemp[j][i].value ? ( k ++,brickTemp[j][i].value) : 0;
					}//clear zero
				}
				this.steps ++;	//玩家移动的步数
				this.needNewBrick = true;
			}
			break;
		}

		case "down":{
			if(this.isMoveable & 0x4)
			{	
				for(i = 0 ; i < this.level; i ++){

					for(j = this.level - 1,k = this.level - 1; j >= 0; j --){
						brickTemp[k][i].value = this.brick[j][i].value ? (k --,this.brick[j][i].value) : 0;
					}// clear zero for each row

					for(j = this.level - 1; j > 0; j --){
						if(brickTemp[j][i].value == brickTemp[j - 1][i].value && brickTemp[j][i].value){
							brickTemp[j][i].value *= 2;
							brickTemp[j][i].type = 'merge';
							brickTemp[j - 1][i].value = 0;
							this.lastScore[this.steps] += brickTemp[j][i].value;
							this.score += brickTemp[j][i].value;// compute score
						}
					}// merge

					for(j = this.level - 1,k = this.level - 1; j >= 0; j --){
						this.brick[j][i].value = 0;
						this.brick[j][i].type = brickTemp[j][i].type;//clear old data
						this.brick[k][i].value = brickTemp[j][i].value ? ( k --,brickTemp[j][i].value) : 0;
					}//clear zero
				}
				this.steps ++;	//玩家移动的步数
				this.needNewBrick = true;
			}
			break;
		}
		case "left":{
			if(this.isMoveable & 0x2)
			{	
				for(i = 0 ; i < this.level; i ++){

					for(j = 0,k = 0; j < this.level; j ++){
						brickTemp[i][k].value = this.brick[i][j].value ? (k ++,this.brick[i][j].value) : 0;
					}// clear zero for each clo

					for(j = 0; j < this.level - 1; j ++){
						if(brickTemp[i][j].value == brickTemp[i][j + 1].value && brickTemp[i][j].value){
							brickTemp[i][j].value *= 2;
							brickTemp[i][j].type = 'merge';
							brickTemp[i][j + 1].value = 0;
							this.lastScore[this.steps] += brickTemp[i][j].value;
							this.score += brickTemp[i][j].value;//compute score;
						}
					}// merge

					for(j = 0,k = 0; j < this.level; j ++){
						this.brick[i][j].value = 0;
						this.brick[i][j].type = brickTemp[i][j].type;//clear old data
						this.brick[i][k].value = brickTemp[i][j].value ? ( k ++,brickTemp[i][j].value) : 0;
					}//clear zero
					
				}
				this.steps ++;	//玩家移动的步数
				this.needNewBrick = true;
			}
			break;
		}

		case "right":{
			if(this.isMoveable & 0x1)	
			{	
				for(i = 0 ; i < this.level; i ++){

					for(j = this.level - 1,k = this.level - 1; j >= 0; j --){
						brickTemp[i][k].value = this.brick[i][j].value ? (k --,this.brick[i][j].value) : 0;
					}// clear zero for each row

					for(j = this.level - 1; j > 0; j --){
						if(brickTemp[i][j].value == brickTemp[i][j - 1].value && brickTemp[i][j].value){
							brickTemp[i][j].value *= 2;
							brickTemp[i][j].type = 'merge';
							brickTemp[i][j - 1].value = 0;
							this.lastScore[this.steps] += brickTemp[i][j].value;
							this.score += brickTemp[i][j].value;//compute score;
						}
					}// merge

					for(j = this.level - 1,k = this.level - 1; j >= 0; j --){
						this.brick[i][j].value = 0;
						this.brick[i][j].type = brickTemp[i][j].type;//clear old data
						this.brick[i][k].value = brickTemp[i][j].value ? ( k --,brickTemp[i][j].value) : 0;
					}//clear zero
					
				}
				this.steps ++;	//玩家移动的步数
				this.needNewBrick = true;
			}
			break;
		}
	}
	this.generateBrick();
	this.needNewBrick = false;
};// move and erease brick;

brickgame.prototype.moveable = function(pos){

	this.isMoveable = 0x0000; // initialize this.isMoveable;
	var brickTemp = new Array();
	var brick_2 = new Array();
	var i, j, k;
	var flag = true;
	for(i = 0 ; i < this.level; i ++){
		brickTemp[i] = new Array();
		brick_2[i] = new Array();
		for(j = 0; j < this.level; j ++){
			brickTemp[i][j] = {
				value:0,
				type:''
			};
			brick_2[i][j] = {
				value:0,
				type:''
			};

		}
	}


	switch(pos){
		case "up":{
				for(i = 0 ; i < this.level; i ++){

					for(j = 0,k = 0; j < this.level; j ++){
						brickTemp[k][i].value = this.brick[j][i].value ? (k ++,this.brick[j][i].value) : 0;
					}// clear zero for each clo

					for(j = 0; j < this.level - 1; j ++){
						if(brickTemp[j][i].value == brickTemp[j + 1][i].value && brickTemp[j][i].value){
							brickTemp[j][i].value *= 2;
							brickTemp[j + 1][i].value = 0;
						}
					}// merge

					for(j = 0,k = 0; j < this.level; j ++){
						brick_2[j][i].value = 0;
						brick_2[j][i].type = brickTemp[j][i].type;//clear old data
						brick_2[k][i].value = brickTemp[j][i].value ? ( k ++,brickTemp[j][i].value) : 0;
					}//clear zero

					for(j = 0; j < this.level; j ++){
						flag = flag && (brick_2[j][i].value == this.brick[j][i].value);
					}
					if(!flag){
						this.isMoveable |= 0x8;
						break;
					}
				}
			break;
		}

		case "down":{
				for(i = 0 ; i < this.level; i ++){

					for(j = this.level - 1,k = this.level - 1; j >= 0; j --){
						brickTemp[k][i].value = this.brick[j][i].value ? (k --,this.brick[j][i].value) : 0;
					}// clear zero for each row

					for(j = this.level - 1; j > 0; j --){
						if(brickTemp[j][i].value == brickTemp[j - 1][i].value && brickTemp[j][i].value){
							brickTemp[j][i].value *= 2;
							brickTemp[j - 1][i].value = 0;

						}
					}// merge

					for(j = this.level - 1,k = this.level - 1; j >= 0; j --){
						brick_2[j][i].value = 0;
						brick_2[j][i].type = brickTemp[j][i].type;//clear old data
						brick_2[k][i].value = brickTemp[j][i].value ? ( k --,brickTemp[j][i].value) : 0;
					}//clear zero

					for(j = 0; j < this.level; j ++){
						flag = flag && (brick_2[j][i].value == this.brick[j][i].value);
					}

					if(!flag){
						this.isMoveable |= 0x4;
						break;
					}
				}
			break;
		}
		case "left":{
				for(i = 0 ; i < this.level; i ++){

					for(j = 0,k = 0; j < this.level; j ++){
						brickTemp[i][k].value = this.brick[i][j].value ? (k ++,this.brick[i][j].value) : 0;
					}// clear zero for each clo

					for(j = 0; j < this.level - 1; j ++){
						if(brickTemp[i][j].value == brickTemp[i][j + 1].value && brickTemp[i][j].value){
							brickTemp[i][j].value *= 2;
							brickTemp[i][j + 1].value = 0;
						}
					}// merge

					for(j = 0,k = 0; j < this.level; j ++){
						brick_2[i][j].value = 0;
						brick_2[i][j].type = brickTemp[i][j].type;//clear old data
						brick_2[i][k].value = brickTemp[i][j].value ? ( k ++,brickTemp[i][j].value) : 0;
					}//clear zero
					
					for(j = 0; j < this.level; j ++){
						flag = flag && (brick_2[i][j].value == this.brick[i][j].value);
					}

					if(!flag){
						this.isMoveable |= 0x2;
						break;
					}
				}
			
			break;
		}

		case "right":{
			for(i = 0 ; i < this.level; i ++){

					for(j = this.level - 1,k = this.level - 1; j >= 0; j --){
						brickTemp[i][k].value = this.brick[i][j].value ? (k --,this.brick[i][j].value) : 0;
					}// clear zero for each row

					for(j = this.level - 1; j > 0; j --){
						if(brickTemp[i][j].value == brickTemp[i][j - 1].value && brickTemp[i][j].value){
							brickTemp[i][j].value *= 2;
							brickTemp[i][j - 1].value = 0;
						}
					}// merge

					for(j = this.level - 1,k = this.level - 1; j >= 0; j --){
						brick_2[i][j].value = 0;
						brick_2[i][j].type = brickTemp[i][j].type;//clear old data
						brick_2[i][j].value = brickTemp[i][j].value ? ( k --,brickTemp[i][j].value) : 0;
					}//clear zero

					for(j = 0; j < this.level; j ++){
						flag = flag && (brick_2[i][j].value == this.brick[i][j].value);
					}
					if(!flag){
						this.isMoveable |= 0x1;
						break;
					}
				}
			break;
		}
	}
};// check whether brick can move;

brickgame.prototype.start = function(){
	this.init();
	this.generateBrick();
	this.generateBrick();
	var gameDiv = document.getElementById("game");
	gameDiv.innerHTML = '';
	var cellNum = game.level * game.level;
	for(var i = 0; i < cellNum; i ++){
		var div = document.createElement("div");
		div.className = 'game-cell';
		gameDiv.appendChild(div);
	} // 动态生成div节点	
	divs = document.getElementsByClassName('game-cell');//set divs to global
	for(i = 0; i < cellNum; i ++){
		divs[i].style.width = 400 / game.level + "px";
		divs[i].style.height = 400 / game.level + "px";
		var tmp = parseInt(document.defaultView.getComputedStyle(divs[0].parentElement).width);
		divs[i].style.marginLeft = (tmp - 400) / (game.level + 1) + "px";
		divs[i].style.marginTop = (tmp - 400) / (game.level + 1) + "px";
			if(!(i % game.level)){
			divs[i].className += " clear";
		}
	}// 动态设置div高度和和宽度

};

brickgame.prototype.reStart = function(){
	this.highScore = this.score > this.highScore ? this.score : this.highScore;
	this.score = 0;
	this.isOver = false;
	this.needNewBrick = true;
	this.winOrFalse = "";
	this.brick = null;
	this.brick = new Array();
	this.undone = null;
	this.undone = new Array();
	this.steps = 0;
	this.isMoveable = 0xf;
	this.start();
	this.paint();
	paintscore();
};

brickgame.prototype.paint = function(){
	for(var i = 0; i < this.level; i++){
		for(var j = 0; j < this.level; j ++){
			if(this.brick[i][j].value){
				divs[i * this.level + j].innerHTML = this.brick[i][j].value + '';
				var index = divs[i * this.level + j].className.indexOf('element_');
				if(index != -1){
					divs[i * this.level + j].className = 
					divs[i * this.level + j].className.substring(0,index - 1);
				}
				divs[i * this.level + j].className += ' element_' + this.brick[i][j].value;
			} else {
				divs[i * this.level + j].innerHTML = '';
				var index = divs[i * this.level + j].className.indexOf('element_');
				if(index != -1){
					divs[i * this.level + j].className = 
					divs[i * this.level + j].className.substring(0,index - 1);
				}
			}
		}
	}
	
};


brickgame.prototype.undoAction = function(num){
	if(this.steps)
	{
		for(var i = 0; i < num ; i ++){
		this.brick = null;
		this.brick = this.undone.pop();
		}
		this.score = this.score - this.lastScore.pop();
		this.paint();
		paintscore();
		this.steps --;
	} else {
		console.warn("不能再退了,再退就StackOverFlow了╮(╯▽╰)╭。。");
	}

}