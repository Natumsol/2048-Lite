bomWidth = window.screen.width;
containerWidth = parseInt(document.defaultView.getComputedStyle(document.getElementById('container')).width);
document.getElementById('container').style.marginLeft = (bomWidth - containerWidth) / 2 + "px";
var restart = document.getElementById('restart');
var undo = document.getElementById('undo');

restart.addEventListener('click',function(){

	game.reStart();
},false);

undo.addEventListener('click',function(){
	game.undoAction(1);
},false);

var opition = document.getElementById('opition');
opition.addEventListener('mouseover',function(event){
	for(var i = 0; i < event.target.children.length; i ++){
		event.target.children[i].style.background = "#9B826A";
	}
},false);

opition.addEventListener('mouseout',function(event){
	for(var i = 0; i < event.target.children.length; i ++){
		event.target.children[i].style.background = "#BBADA0";
	}
},false);

opition.addEventListener('click',function(event){
	var div = document.createElement('div');
	div.id = "menu_context";
	div.innerHTML = "<ul id='pop_menu'> <li class='item' id = 'Modes'>Modes</li> <li class='item' id = 'Level'>Level</li> <li class='item' id = 'Themes'>Themes</li> <li class='item' id = 'About'><a target = '_blank' href = 'http://blog.natumsol.com/project/' >About</a></li> </ul>";
	document.body.appendChild(div);
	event.stopPropagation();

	document.getElementById('menu_context').children[0].addEventListener('click',function(event){
			switch(event.target.id)
			{
				case 'Modes':{
					div.innerHTML = "<ul id='leve2Modes'> <li class='item'  id = 'Practice'>Practice</li> <li class='item' id = 'Classic'>Classic</li> </ul>";
					/*document.getElementById('menu_context').children[0].addEventListener('mouseover',function(event){
						switch(event.target.id){

							case 'Classic' : {
								event.target.style.background = "#CCC0B3";
							}
						}


					},false);*/

					document.getElementById('menu_context').children[0].addEventListener('click',function(event){
						switch(event.target.id){

							case 'Classic' : {
								document.getElementById('tips').innerHTML = "<strong>Classical mode</strong>:come on ,get 2048!!"
								document.getElementById('undo').style.visibility = "hidden";
							}
							break;

							case 'Practice' : {
								document.getElementById('tips').innerHTML = "<strong>Practice mode</strong>:you have option to undo your last move."
								document.getElementById('undo').style.visibility = "visible";
								document.getElementById('restart').style.visibility = "visible";
								document.getElementById('survivalStarter').style.visibility = "hidden";
							}
							break;

							case 'Survival' : {
								document.getElementById('tips').innerHTML = "<strong>Survival mode</strong>:try to get score as much as possible in 60s."
								document.getElementById('undo').style.visibility = "hidden";
								document.getElementById('restart').style.visibility = "hidden";
								document.getElementById('survivalStarter').style.visibility = "visible";
								document.getElementById('survivalStarter').addEventListener("click",function(){
									var time = 60;
									game.reStart();
									var timeer = function(){
										if(time > 9){
											document.getElementById('timer').innerHTML = ' ' + time + '';
											time -- ;
											setTimeout(timeer,1000);
										} else if (time <= 9 && time > 0)
										{
											document.getElementById('timer').innerHTML = '&nbsp;' + time + '';
											time -- ;
											setTimeout(timeer,1000);
										}

										 else {
											document.getElementById('timer').innerHTML = '&nbsp;&nbsp;';
										}
									};
									setTimeout(timeer,1000);
								},false);
							}

						}
					},false);
				}
				break;
				case 'Level':{
					div.innerHTML = "<ul id='level2Level'> <li class='item' id = 'threeTimesThree'>3 * 3</li> <li class='item' id = 'fourTimesFour'>4 * 4</li> <li class='item' id = 'fiveTimesFive'>5 * 5</li> <li class='item' id = 'sixTimesSix'>6* 6</li> <li class='item' id = 'sevenTimesSeven'>7 * 7</li> </ul>";
					
					document.getElementById('menu_context').children[0].addEventListener('click',function(event){
						switch(event.target.id){
							case 'threeTimesThree' : {
								game = null;
								var divnodes = document.getElementById('game').children;
								for(var i = 0; i < divnodes.length; i  = 0){
									divnodes[i].parentNode.removeChild(divnodes[i]);
								}
								 var str = document.getElementById('game').getAttribute('class').substring(0,6) + 'threeTimesThree';
								 document.getElementById('game').setAttribute('class',str);
								game = new brickgame(3,2048,"");
								game.start();
								game.paint();
							}
							break;

							case 'fourTimesFour' : {
								game = null;
								var divnodes = document.getElementById('game').children;
								for(var i = 0; i < divnodes.length; i = 0){
									divnodes[i].parentNode.removeChild(divnodes[i]);
								}
								var str = document.getElementById('game').getAttribute('class').substring(0,6) + 'fourTimesFour';
								 document.getElementById('game').setAttribute('class',str);
								game = new brickgame(4,2048,"");
								game.start();
								game.paint();

							}
							break;

							case 'fiveTimesFive' : {
								game = null;
								var divnodes = document.getElementById('game').children;
								for(var i = 0; i < divnodes.length; i = 0){
									divnodes[i].parentNode.removeChild(divnodes[i]);
								}
								var str = document.getElementById('game').getAttribute('class').substring(0,6) + 'fiveTimesFive';
								document.getElementById('game').setAttribute('class',str);
								game = new brickgame(5,2048,"");
								game.start();
								game.paint();

							}
							break;

							case 'sixTimesSix' : {
								game = null;
								var divnodes = document.getElementById('game').children;
								for(var i = 0; i < divnodes.length; i = 0){
									divnodes[i].parentNode.removeChild(divnodes[i]);
								}
								var str = document.getElementById('game').getAttribute('class').substring(0,6) + 'sixTimesSix';
								document.getElementById('game').setAttribute('class',str);
								game = new brickgame(6,2048,"");
								game.start();
								game.paint();

							}
							break;

							case 'sevenTimesSeven' : {
								game = null;
								var divnodes = document.getElementById('game').children;
								for(var i = 0; i < divnodes.length; i = 0){
									divnodes[i].parentNode.removeChild(divnodes[i]);
								}
								var str = document.getElementById('game').getAttribute('class').substring(0,6) + 'sevenTimesSeven';
								document.getElementById('game').setAttribute('class',str);
								game = new brickgame(7,2048,"");
								game.start();
								game.paint();

							}

						}
					},false);
				}
				break;
				case 'Themes':{
					if(!themes){
						document.body.style.background = "#272822";
						themes = ~themes;
					} else {
						document.body.style.background = "#E6E6E6";
						themes = ~themes;
					}
					
				}
				break;
				case 'About':{

				}
			}
		event.stopPropagation();
		},false);
},false);


document.addEventListener('click',function(event){
	try{
		document.body.removeChild(document.getElementById("menu_context"));
	}
	catch(err){

	}
	
},false);

