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
	
}

function _reload(){
	//canvas.clear();
	game.build();
	piece.show();
}




//GAME
function Game(){
	this.tab=[
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		
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
	
	
	this.player=1;

	this.speed=400;
}
Game.prototype={
	
	add:function(i,j){
		
		this.tab[i][j]=this.player;
		this.build();
		this.check(i,j);
		this.build();		
		
		this.switchPlayer();
	},
	
	switchPlayer:function(){
		if(this.player==1){
			this.player=2;
		}else{
			this.player=1;
		}
		getById('player').src='img/othello-'+this.player+'.png';
	},
	
	install:function(){
		return 0;
		var shtml='';
		
		
		for(i=0;i<this.tab.length;i++){
			for(j=0;j<this.tab[0].length;j++){
						
				ifond= this.tab[i][j] ;
				
				shtml+='<td><a href="#" onclick="game.add('+i+','+j+');return false;" ><img style="width:40px;height:40px" src="img/othello-'+ifond+'.png" id="case_'+i+'_'+j+'" /></a></td>';
				
			}
			shtml+='</tr><tr>';
		}
		
		getById('content').innerHTML='<table>'+shtml;
		
		 
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
		
		 
		getById('case_'+i+'_'+j).alt=ifond;
		
		if(ifond==0){
			getById('case_'+i+'_'+j).src='img/othello-0.png';
		}else{
			getById('case_'+i+'_'+j).src='img/othello-'+ifond+'.png';
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
	
	checkLeft:function(playerToCheck,i,j){
		var bConvert=false;
		for(var j2=j-1;j2>=0;j2--){
			if(this.tab[i][j2]==0){
				return false;
			}else if(this.tab[i][j2]==playerToCheck){
				bConvert=true;
				break;
			}
		}
		if(bConvert){
			for(var j2=j-1;j2>=0;j2--){
				if(this.tab[i][j2]!=playerToCheck){
					this.tab[i][j2]=playerToCheck;
					this.check(i,j2);
				}else if(this.tab[i][j2]==playerToCheck){
					break;
				}
			}
		}
		return bConvert;
	},
	checkRight:function(playerToCheck,i,j){
		var bConvert=false;
		for(var j2=j+1;j2< this.tab[0].length;j2++){
			if(this.tab[i][j2]==0){
				return false;
			}else if(this.tab[i][j2]==playerToCheck){
				bConvert=true;
				break;
			}
		}
		if(bConvert){
			for(var j2=j+1;j2< this.tab[0].length;j2++){
				if(this.tab[i][j2]!=playerToCheck){
					this.tab[i][j2]=playerToCheck;
					this.check(i,j2);
				}else if(this.tab[i][j2]==playerToCheck){
					break;
				}
			}
		}
		return bConvert;
	},
	checkTop:function(playerToCheck,i,j){
		var bConvert=false;
		for(var i2=i-1;i2>=0;i2--){
			if(this.tab[i2][j]==0){
				return false;
			}else if(this.tab[i2][j]==playerToCheck){
				bConvert=true;
				break;
			}
		}
		if(bConvert){
			for(var i2=i-1;i2>=0;i2--){
				if(this.tab[i2][j]!=playerToCheck){
					this.tab[i2][j]=playerToCheck;
					this.check(i2,j);
				}else if(this.tab[i2][j]==playerToCheck){
					break;
				}
			}
		}
		return bConvert;
	},
	checkBottom:function(playerToCheck,i,j){
		var bConvert=false;
		for(var i2=i+1;i2< this.tab.length;i2++){
			if(this.tab[i2][j]==0){
				return false;
			}else if(this.tab[i2][j]==playerToCheck){
				bConvert=true;
				break;
			}
		}
		if(bConvert){
			for(var i2=i+1;i2< this.tab.length;i2++){
				if(this.tab[i2][j]!=playerToCheck){
					this.tab[i2][j]=playerToCheck;
					this.check(i2,j);
				}else if(this.tab[i2][j]==playerToCheck){
					break;
				}
			}
		}
		return bConvert;
	},
	
	check:function(i,j){
		var playerToCheck=this.tab[i][j];
		
		this.checkLeft(playerToCheck,i,j);
		this.checkRight(playerToCheck,i,j);
		this.checkTop(playerToCheck,i,j);
		this.checkBottom(playerToCheck,i,j);
		
		//check horizontal
		var bLeft=0;
		for(var j2=j-1;j2>=0;j2--){
			if(this.tab[i][j2]==0){
				break;
			}else if(this.tab[i][j2]!=playerToCheck){
				bLeft=1;
				break;
			}
		}
		var bRight=0;
		for(var j2=j+1;j2<this.tab[0].length;j2++){
			if(this.tab[i][j2]==0){
				break;
			}else if(this.tab[i][j2]!=playerToCheck){
				bRight=1;
				break;
			}
		}
		if(bLeft==1 && bRight==1){
			if(playerToCheck==1){
				this.tab[i][j]=2;
			}else{
				this.tab[i][j]=1;
			}
			this.check(i,j);
		}
		
		//check vertical
		var bTop=0;
		for(var i2=i-1;i2>=0;i2--){
			if(this.tab[i2][j]==0){
				break;
			}else if(this.tab[i2][j]!=playerToCheck){
				bTop=1;
				break;
			}
		}
		var bBottom=0;
		for(var i2=i+1;i2<this.tab.length;i2++){
			if(this.tab[i2][j]==0){
				break;
			}else if(this.tab[i2][j]!=playerToCheck){
				bBottom=1;
				break;
			}
		}
		if(bTop==1 && bBottom==1){
			if(playerToCheck==1){
				this.tab[i][j]=2;
			}else{
				this.tab[i][j]=1;
			}
			this.check(i,j);
		}
		
		 
	},
	
	
};


