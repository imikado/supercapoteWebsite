var canvas;
var game;
var piece;

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
	piece.j=0;
	
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
	
	if(type=='piece1'){
		this.tab=[
			[
				[10,0,0,0],
				[11,0,0,0],
				[11,0,0,0],
				[12,0,0,0],
			],
			[
				[0,0,0,0],
				[13,14,14,15],
				[0,0,0,0],
				[0,0,0,0],
				
			],
		
		];
	}else if(type=='piece2'){
		this.tab=[
			[
				[20,23,0,0],
				[21,22,0,0],
				[0,0,0,0],
				[0,0,0,0],
			],
			
			
		];
	}else if(type=='piece3'){
		this.tab=[
			[
				[30,31,0,0],
				[0,32,33,0],
				[0,0,0,0],
				[0,0,0,0],
				
			],
			[
				[0,0,34,0],
				[0,36,35,0],
				[0,37,0,0],
				[0,0,0,0],
				
			],
			 
		];
	}else if(type=='piece4'){
		this.tab=[
			[
				[0 ,403 ,0,0],
				[44,48 ,40,0],
				[0,0,0,0],
				[0,0,0,0],
				
			],
			[
				[0  ,42,0,0],
				[406,402,0,0],
				[0  ,46,0,0],
				[0,0,0,0],
				
			],
			[
				[0 ,0,0,0],
				[41,401,45,0],
				[0 ,405  ,0,0],
				[0,0,0,0],
				
			],
			[
				[0,47,0,0],
				[0,49,404,0],
				[0,43,0,0],
				[0,0,0,0],
				
			],
		];
	}else if(type=='piece5'){
		this.tab=[
			[
				[59,53,0,0],
				[57,0,0,0],
				[54,0,0,0],
				[0,0,0,0],
				
			],
			[
				[55,52,56,0],
				[0 ,0 ,54,0],
				[0,0,0,0],
				[0,0,0,0],
				
			],
			[
				[0 ,50,0,0],
				[0 ,57,0,0],
				[55,58,0,0],
				[0,0,0,0],
				
			],
			[
				[50,0,0,0],
				[51,52,53,0],
				[0,0,0,0],
				[0,0,0,0],
				
			],
		];
	}else if(type=='piece6'){
		this.tab=[
			[
				[0,65,64,0],
				[67,66,0,0],
				[0,0,0,0],
				[0,0,0,0],
				
			],
			[
				[0,60,0,0],
				[0,61,62,0],
				[0,0,63,0],
				[0,0,0,0],
				
			],
			 
		];
	}
	
	 
}
Piece.prototype={
		
	start:function(){
		this.timer=setInterval('piece.play()',1000);
	},
	play:function(){
		
		if(!this.check((this.i+1),this.j,this.sens)){
			this.stop();
			next();
			return;
		}
		
		this.i++;
		_reload();
	},
	stop:function(){
		
		for(i=0;i< this.tab[this.sens].length;i++){
			for(j=0;j<this.tab[this.sens][0].length;j++){
				if(this.tab[this.sens][i][j]>0){ 
					game.tab[this.i+i][this.j+j]=this.tab[this.sens][i][j];
				}
			}
		 }
		
		clearInterval(this.timer);
		this.timer='';
	},
	show:function(){
			
		 for(i=0;i< this.tab[this.sens].length;i++){
			for(j=0;j<this.tab[this.sens][0].length;j++){
				if(this.tab[this.sens][i][j]>0){ 
					game.showCase(this.i+i,this.j+j,this.tab[this.sens][i][j]);
				}
			}
		 }
	},
	turnUp:function(){
		
		if(this.check( this.i,this.j,(this.sens+1) ) ){
			if(this.tab[ (this.sens +1) ]){
				this.sens++;
			}else{
				this.sens=0;
			}
		}
	},
	goDown:function(){
		if(this.check( (this.i+2),this.j,this.sens) ){
			this.i+=2;
		}
	},
	goLeft:function(){
		if(this.check(this.i,(this.j-1),this.sens) ){
			this.j--;
		}
	},
	goRight:function(){
			
		if(this.check(this.i,(this.j+1),this.sens) ){
			this.j++;
		}
	},
	check:function(_i,_j,_sens){
		if(!this.tab[_sens]){
			_sens=0;
		}
		
		if(_j > game.tab[0].length ){
			return false;
		}else{
			for(i=0;i< this.tab[_sens].length;i++){
				for(j=0;j<this.tab[_sens][0].length;j++){
					if(this.tab[_sens][i][j]>0){
						
						if(!game.tab[_i+i]){
							return false;
						}else	if(game.tab[_i+i][ _j+j ] != 0){
							return false;
						}
					}
				}
			}
		}
		return true;
		
	}
	

};


//GAME
function Game(){
	this.tab=[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		
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
}
Game.prototype={
	
	install:function(){
		
		var shtml='';
		
		for(i=0;i<this.tab.length;i++){
			for(j=0;j<this.tab[0].length;j++){
						
				ifond= this.tab[i][j] ;
				
				shtml+='<img src="img/tetris-'+ifond+'.png" id="case_'+i+'_'+j+'" />';
				
			}
			shtml+='<br/>';
		}
		
		getById('content').innerHTML=shtml;
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
		
		getById('case_'+i+'_'+j).src='img/tetris-'+ifond+'.png';
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
		for(i=0;i<this.tab.length;i++){
			total=0;
			for(j=0;j<this.tab[0].length;j++){
				if(this.tab[i][j] > 0){
					total++;
				}
			}
			if(total == (this.tab[0].length)){
				for(k=0;k<this.tab[0].length;k++){
					this.tab[i][k]=0;
				}
				
				this.rebuild(i);
			}
		}
	},
	rebuild:function(max){
		for(i=max;i>0;i--){
			for(j=0;j<this.tab[0].length;j++){
			this.tab[i][j]=this.tab[(i-1)][j];
			//this.tab[i][j]=0;
			}
		}
		
		this.score+=10;
		getById('score').innerHTML=this.score;
	}
	
};



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

}
