var canvas;
var game;
var piece;

var piece2;

var choix=1;
var max=6;

function load(){
	//canvas = new Canvas('canvas');
	//canvas.width=600;
	//canvas.height=400;
	game= new Game();
	game.install();
	
	next();
}

function _reload(){
	//canvas.clear();
	game.build();
	piece.show();
}
function next(){
	
	game.check();
	
	piece='';
	
	piece=new Piece('piece'+choix);
	
	piece.i=0;
	piece.j=Math.floor(Math.random()*19);
	
	piece.start();
	
	choix++;
	if(choix > max){
			choix=1;
	}
}




//PIECE
function Piece(type){
	this.type=type;
	this.i=-1;
	this.j=-1;
	
	this.sens=0;
	
	this.timer;
	 
}
Piece.prototype={
	
	kill:function(){
		game.tab[this.i][this.j]=0;
		game.showCase(this.i,this.j,0);
		
		clearInterval(this.timer);
		this.timer='';
	},
	start:function(){
		this.timer=setInterval('piece.play()',game.speed);
	},
	play:function(){
		
		if(!this.check((this.i+1),this.j,this.sens)){
			this.stop();
			game.ilife--;
			game.buildLife();
			
			if(game.ilife <=0){
				return;
			}
			
			next();
			return;
		}
		
		this.i++;
		
		game.showCase(this.i-1,this.j,0);
		this.show();
	},
	stop:function(){
		
		//for(i=0;i< this.tab[this.sens].length;i++){
		//	for(j=0;j<this.tab[this.sens][0].length;j++){
				game.tab[this.i][this.j]=1;
				
		//	}
		 //}
		
		clearInterval(this.timer);
		this.timer='';
	},
	show:function(){
			
		 //for(i=0;i< this.tab[this.sens].length;i++){
		//	for(j=0;j<this.tab[this.sens][0].length;j++){
				game.showCase(this.i,this.j,1);
				
		//	}
		 //}
	},
	
		
	check:function(_i,_j,_sens){
		
		
		if(_j > game.tab[0].length ){
			return false;
		}else{
			//for(i=0;i< this.tab[_sens].length;i++){
			//	for(j=0;j<this.tab[_sens][0].length;j++){
						
			if(!game.tab[_i]){
				return false;
			}else	if(game.tab[_i][ _j ] != 0){
				return false;
			}
					
			//	}
			//}
		}
		return true;
		
	}
	

};



//GAME
function Game(){
	this.tab=[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		

	];
	
	this.ihauteur=20;
	this.ilargeur=20;
	
	this.score=0;
	
	this.tColor=[
		'#eee',
		'#222222',
		'#441111',
		'#114411',
		'#111144',
		'#444411',
		'#114444',
		'#662244',
		'#226633',
		'#000000',
	];
	
	this.ilife=3;

	this.speed=400;
}
Game.prototype={
	
	fire:function(i,j){
	
		if(i==piece.i && j==piece.j){
			this.score+=10;
			this.speed-=10;
			getById('score').innerHTML=this.score;
			piece.kill();next();
		}
		
	},
	
	install:function(){
		
		var shtml='';
		
		for(i=0;i<this.tab.length;i++){
			for(j=0;j<this.tab[0].length;j++){
						
				ifond= this.tab[i][j] ;
				
				shtml+='<a href="#" onclick="game.fire('+i+','+j+');return false;" ><img src="img/tetris-'+ifond+'.png" id="case_'+i+'_'+j+'" />';
				
			}
			shtml+='<br/>';
		}
		
		getById('content').innerHTML=shtml;
		
		this.buildLife();
	},	
	buildLife:function(){
		getById('life').innerHTML='';
		for(var i=0;i<this.ilife;i++){
			getById('life').innerHTML+='<img src="img/life.png"/>';
		}
		for(var i=this.ilife;i<3;i++){
			getById('life').innerHTML+='<img src="img/life-off.png"/>';	
		}
	},
	
	build:function(){
		
		for(i=0;i<this.tab.length;i++){
			for(j=0;j<this.tab[0].length;j++){
						
				ifond= this.tab[i][j] ;
				
				this.showCase(i,j,ifond);
				
			}
		}
	},
	showCase:function(i,j,ifond){
		
		if(ifond>0){
			getById('case_'+i+'_'+j).src='img/Bad.png';
		}else{
			getById('case_'+i+'_'+j).src='img/tetris-'+ifond+'.png';
		}
		/*
		fond=this.tColor[ ifond ];
		
		_x=( j* this.ilargeur );
		_y=( i* this.ihauteur);
		
		contour='#ffffff';
		if(ifond > 0){
			contour='#000000';
		}
		
		canvas.drawRect(_x,_y,this.ilargeur,this.ihauteur,contour,fond);
		*/
	},
	check:function(){
		
	},
	
	
};


/*
document.onkeydown=function(event){
    if(event != null){
        
	//    alert(event.keyCode);
        if(event.keyCode == 38){//haut
		piece.turnUp();
		
		_reload();
	}else if(event.keyCode == 40){//bas 
		piece.goDown();
		
		_reload();
	}else if(event.keyCode == 39){//droite
		piece.goRight();
		_reload();
        }else if(event.keyCode == 37){//gauche
		piece.goLeft();
		_reload();
	}
        
        key_pressed = true;
    }else{
        key_pressed = false;
    }

}*/
