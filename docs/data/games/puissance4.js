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
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		

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
	
	add:function(j){
		for(var i=this.tab.length-1;i>0;i--){
			if(this.tab[i][j]==0){
				this.tab[i][j]=this.player;
				this.build();
				this.check(i,j);
				break;
			}
		}
		
		this.switchPlayer();
	},
	
	switchPlayer:function(){
		if(this.player==1){
			this.player=2;
		}else{
			this.player=1;
		}
		getById('player').src='img/puissance-'+this.player+'.png';
	},
	
	install:function(){
		
		var shtml='';
		
		for(j=0;j<this.tab[0].length;j++){
					
			
			shtml+='<a href="#" onclick="game.add('+j+');return false;" ><img style="width:40px;border:0px solid gray" src="img/puissance-btn.png"  /></a>';
			
		}
		shtml+='<br/>';
		
		for(i=0;i<this.tab.length;i++){
			for(j=0;j<this.tab[0].length;j++){
						
				ifond= this.tab[i][j] ;
				
				shtml+='<img src="img/puissance-'+ifond+'.png" id="case_'+i+'_'+j+'" />';
				
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
		
		if(ifond==0){
			getById('case_'+i+'_'+j).src='img/puissance-0.png';
		}else{
			getById('case_'+i+'_'+j).src='img/puissance-'+ifond+'.png';
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
	check:function(i,j){
		var playerToCheck=this.tab[i][j];
		
		//check vertical
		var checkVertical=1;
			//haut
			for(var i2=i-1;i2>0;i2--){
				if(this.tab[i2][j]!=playerToCheck){
					break;
				}else{
					checkVertical++;
				}
			}
			//bas
			for(var i2=i+1;i2< this.tab.length;i2++){
				if(this.tab[i2][j]!=playerToCheck){
					break;
				}else{
					checkVertical++;
				}
			}
			
			if(checkVertical>=4){
				alert('Joueur '+playerToCheck+' gagne');
				return;
			}
		
		//horizontal
		var checkHorizontal=1;
			//haut
			for(var j2=j-1;j2>0;j2--){
				if(this.tab[i][j2]!=playerToCheck){
					break;
				}else{
					checkHorizontal++;
				}
			}
			//bas
			for(var j2=j+1;j2< this.tab[0].length;j2++){
				if(this.tab[i][j2]!=playerToCheck){
					break;
				}else{
					checkHorizontal++;
				}
			}
			
			if(checkHorizontal>=4){
				alert('Joueur '+playerToCheck+' gagne');
				return;
			}
			
		//diag montante
		var diagAsc=1;
			//haut droite
			j2=j;
			for(var i2=i-1;i2>0;i2--){
				j2++;
				if(this.tab[i2][j2]!=playerToCheck){
					break;
				}else{
					diagAsc++;
				}
			}
			//bas gauche
			j2=j;
			for(var i2=i+1;i2< this.tab.length;i2++){
				j2--;
				if(this.tab[i2][j2]!=playerToCheck){
					break;
				}else{
					diagAsc++;
				}
			}
			
			if(diagAsc>=4){
				alert('Joueur '+playerToCheck+' gagne');
				return;
			}
			
		//diag descendante
		var diagDesc=1;
			//haut gauche
			j2=j;
			for(var i2=i-1;i2>0;i2--){
				j2--;
				if(this.tab[i2][j2]!=playerToCheck){
					break;
				}else{
					diagDesc++;
				}
			}
			//bas droite
			j2=j;
			for(var i2=i+1;i2< this.tab.length;i2++){
				j2++;
				if(this.tab[i2][j2]!=playerToCheck){
					break;
				}else{
					diagDesc++;
				}
			}
			
			if(diagDesc>=4){
				alert('Joueur '+playerToCheck+' gagne');
				return;
			}
	},
	
	
};


