var canvas;
var game;
var piece;
var spiece;

var choix=1;
var max=6;

var timerGrow;
var mvt=0;

function load(){
	
	game= new Game();
	game.build();
	
	next();
	_addCake();
}

function _reload(){
	/*canvas.clear();
	game.build();
	piece.show();*/
}

var cakeIsHere=0;
var cakeI=0;
var cakeJ=0;

function _step(){
	
	if(cakeIsHere){
		mvt+=1;
		if(mvt > 15){
			if(game.tab[cakeI][cakeJ]=='cake'){
				game.showCase(cakeI,cakeJ,0);
				cakeIsHere=0;
			}
			mvt=0;
			_addCake();
		}
	}
	
}
function _addCake(){
	
	cakeIsHere=1;
	
	var i = Math.floor(Math.random()*game.tab.length);
	var j= Math.floor(Math.random()*game.tab[0].length);
	
	var iTry=0;
	
	while(game.tab[i][j]!=0){
		i = Math.floor(Math.random()*game.tab.length);
		j= Math.floor(Math.random()*game.tab[0].length);
		
		iTry++;
	}
	
	cakeI=i;
	cakeJ=j;
	
	game.showCase(i,j,'cake');
	
	
	
}
function next(){
	
	
	piece='';
	
	piece=new Piece('piece'+choix);
	piece.i=1;
	piece.j=1;
	
	piece.addChild();
	piece.addChild();
	piece.addChild();
 


	piece.start();
	
	choix++;
	if(choix > max){
			choix=1;
	}
}


//SPIECE
function Spiece(){
	this.iHistory=0;
	this.i=-1;
	this.j=-1;
	
	this.sens='down';
}
Spiece.prototype={
	
	show:function(img){
			
		game.showCase(this.i,this.j,img);
		
	},
	
	moveTo:function(i,j){
		if(this.check(i,j)){
			this.i=i;
			this.j=j;
		}
	},
	
	check:function(_i,_j){

		//debug(_i+' '+_j+' :'+piece.checkHistory(this.iHistory,_i,_j) );
		 
		
		if(_j > game.tab[0].length ){
			return false;
		}else{		
			if(!game.tab[_i]){
				return false;
			}else	if(game.tab[_i][ _j ] != 0){
				return false;
			}
			
		}
		return true;
		
	}
	

};



//PIECE
function Piece(type){
	this.type=type;
	this.i=-1;
	this.j=-1;
	
	this.iHistory=0;
	this.tHistory=new Array();

	this.sens='down';
	
	this.timer;
	
	this.tab=[[[1],]];
	
	this.tChild=[];
	
	 this.nbChild=0;
}
Piece.prototype={
	
	
	addChild:function(){
		this.tChild[this.nbChild]=new Spiece();
		this.nbChild++;
	},
	moveChilds:function(){
		var iHistoryChild=this.iHistory-2;
		for (var i in this.tChild){
			var spiece = this.tChild[i];
			if(this.tHistory[iHistoryChild]){
				spiece.moveTo(this.tHistory[iHistoryChild]['i'],this.tHistory[iHistoryChild]['j']);
				
			}iHistoryChild-=1;	
			
			
		}
	},
	showChilds:function(){
		for (var i in this.tChild){
			
			i=parseInt(i);
			
			var spiece = this.tChild[i];
			
			var previous;
			var next;
			
			if(i==0){
				previous=piece;
			}else{
				previous=this.tChild[ (i-1) ];
			}
						
			if(this.tChild[ (i+1) ]){
			
				next=this.tChild[ (i+1)];
								
				var img='';
				if(previous.j == next.j){//meme colonne
					img='vert';
				}else if(previous.i == next.i){//meme ligne
					img='horiz';
				}else if(next.i==(previous.i+1) && next.j==(previous.j+1)){ //corner ^| bottom left
					if(spiece.i==next.i){
						img='corner-top-right';
					}else{
						img='corner-bottom-left';
					}
				}else if(next.i==(previous.i-1) && next.j==(previous.j-1)){ //corner |_ top right
					if(spiece.j!=next.j){
						img='corner-bottom-left';
					}else{
						img='corner-top-right';
					}
				}else if(next.i==(previous.i-1) && next.j==(previous.j+1)){ //corner |^ bottom right
					if(spiece.i!=next.i){
						img='corner-top-left';
					}else{
						img='corner-bottom-right';
					}
				}else if(next.i==(previous.i+1) && next.j==(previous.j-1)){ //corner _| top left
					if(spiece.j==next.j){
						img='corner-bottom-right';
					}else{
						img='corner-top-left';
					}
				}
				spiece.show(img);
			
			}else{
				if(spiece.i!=previous.i){
					spiece.show('vert');
				}else{
					spiece.show('horiz');
				}
			}
		}
	},
	start:function(){
		this.timer=setInterval('piece.play()',300);
	},
	play:function(){
		
		if(this.sens=='up'){
			if(!this.check( (this.i-1),this.j,this.sens) ){
				this.stop();
				//next();
				return;
			}
			this.i--;
		}else if(this.sens=='down'){
			if(!this.check( (this.i+1),this.j,this.sens) ){
				this.stop();
				//next();
				return;
			}
			this.i++;
		}else if(this.sens=='left'){
			if(!this.check(this.i,(this.j-1),this.sens) ){
				this.stop();
				//next();
				return;
			}
			this.j--;
		}else if(this.sens=='right'){
			if(!this.check(this.i,(this.j+1),this.sens) ){
				this.stop();
				//next();
				return;
			}
			this.j++;
		}
		
		if(game.tab[this.i][this.j]=='cake'){
			
			game.score+=10;
			game.showScore();
			
			this.addChild();
			_addCake();
			
		}
		this.addHistory(this.i,this.j);
		this.reset();
		this.moveChilds();
		
		this.showChilds();

		
		this.show();
		
		
		
		
		_step();
		//_reload();
	},
	reset:function(){
		for(var i in this.tHistory){
			game.showCase(this.tHistory[i]['i'],this.tHistory[i]['j'],0);
		}
	},
	stop:function(){
		
		game.tab[this.i][this.j]=2;
		/*
		for(i=0;i< this.tab[this.sens].length;i++){
			for(j=0;j<this.tab[this.sens][0].length;j++){
				if(this.tab[this.sens][i][j]>0){ 
					game.tab[this.i+i][this.j+j]=this.tab[this.sens][i][j];
				}
			}
		 }*/
		
		clearInterval(this.timer);
		this.timer='';
	},
	show:function(){
			
		game.showCase(this.i,this.j,'head-'+this.sens);
		this.showChilds();
		/*
		 for(i=0;i< this.tab[this.sens].length;i++){
			for(j=0;j<this.tab[this.sens][0].length;j++){
				if(this.tab[this.sens][i][j]>0){ 
					game.showCase(this.i+i,this.j+j,this.tab[this.sens][i][j]);
				}
			}
		 }*/
	},
	checkHistory:function(_iHistory,_i,_j){
		return 1;
	},
	addHistory:function(sens){
		//debug1('addHist '+this.iHistory+' '+this.i+' '+this.j );
		
		
		this.tHistory[ this.iHistory ]=new Array();
		this.tHistory[ this.iHistory ]['i']=this.i;
		this.tHistory[ this.iHistory ]['j']=this.j;
		
		this.iHistory++;
		
		
	},
	goUp:function(){
		this.sens='up';
	},
	goDown:function(){
		this.sens='down';
	},
	goLeft:function(){
		this.sens='left';
	},
	goRight:function(){
		this.sens='right';
	},
	check:function(_i,_j,_sens){
		 
		
		if(_j > game.tab[0].length ){
			return false;
		}else{		
			if(!game.tab[_i]){
				return false;
			}else if(game.tab[_i][_j]=='cake'){
				return true;
			}else if(game.tab[_i][_j] != 0){
				return false;
			}
			
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
		
	build:function(){
		
		var sHtml='';
		
		for(i=0;i<this.tab.length;i++){
			for(j=0;j<this.tab[0].length;j++){
						
				ifond= this.tab[i][j] ;
				
				sHtml+='<img src="img/tetris-0.png" id="case_'+i+'-'+j+'" />';
				
			}
			sHtml+='<br />';
		}
		getById('content').innerHTML=sHtml;
	},
	showCase:function(i,j,ifond){
		if(getById('case_'+i+'-'+j)){
			game.tab[i][j]=ifond;
			getById('case_'+i+'-'+j).src="img/snake-"+ifond+".png";
		}
	},
	check:function(){
		
	},
	showScore:function(max){
		
		getById('score').innerHTML=this.score;
	}
	
};



document.onkeydown=function(event){
    if(event != null){
        
	//    alert(event.keyCode);
        if(event.keyCode == 38){//haut
		if(piece.sens=='right' || piece.sens=='left'){		
			piece.goUp();
		}
		
		_reload();
	}else if(event.keyCode == 40){//bas 
		if(piece.sens=='right' || piece.sens=='left'){		
			piece.goDown();
		}
		
		_reload();
	}else if(event.keyCode == 39){//droite
		if(piece.sens=='up' || piece.sens=='down'){		
			piece.goRight();
		}	
		_reload();
        }else if(event.keyCode == 37){//gauche
		if(piece.sens=='up' || piece.sens=='down'){		
			piece.goLeft();
		}
		_reload();
	}
        
        key_pressed = true;
    }else{
        key_pressed = false;
    }

}
