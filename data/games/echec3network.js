var canvas;
var game;
var piece;

var choix=1;
var max=6;

var id;
var player;

var oInterval;

function load(choice){
	//canvas = new Canvas('canvas');
	//canvas.width=600;
	//canvas.height=400;
	player=choice;

	var sUrl=document.location.href;
	tVar=sUrl.split('?id');
	id=tVar[1];

	getById('partie').innerHTML='Partie num&eacute;ro <strong>'+id+'</strong>';

	game= new Game();
	game.install();
	game.installperson();
	game.installclic();
	
	//game.switchTour();
	game.installed=1;

	getById('background').src='echec3network.php?action=import&id='+id;

	
}

function reimport(){
	getById('background').src='';
	getById('background').src='echec3network.php?action=import&id='+id;
}

function loadPiece(i,j,spiece){
	//alert(i+' '+j+' '+spiece);
	if(game && game.tPiece[i] && game.tPiece[i][j]){
		game.tPiece[i][j].createFrom(spiece);
	}
}
function rebuildPions(){
	if(game){
		game.rebuildPions();
	}
}
function setTour(stour){
	if(game){
		game.tour=stour;
		game.loadTour();
	}
}


//PIECE
function Piece(){
	this.sName='';
	this.sColor='';
	
	this.i=0;
	this.j=0;
	
	this.dir='img/'
	
	this.bEmpty=1;
}
Piece.prototype={
	reset:function(){
		this.createFrom(0);
	},
	createFrom:function(sPiece){
		if(sPiece==0){
			this.bEmpty=1;
			this.setColor('');
			this.setName('case-vide');
		}else{
			this.bEmpty=0;
			this.setColor(sPiece.substr(0,1));
			this.setName(sPiece.substr(1,1));
		}
	},
	isEmpty:function(){
		return this.bEmpty;
	},
	setName:function(sName){
		this.sName=sName;
	},
	setColor:function(sColor){
		this.sColor=sColor;
	},
	getName:function(){
		return this.sName;
	},
	getColor:function(){
		return this.sColor;
	},
	
	setCoord:function(i,j){
		this.i=i;
		this.j=j;
	},
	
	getImg:function(){
		return this.dir+this.sColor+this.sName+'.png';
	},
	
	reload:function(){
		getById('piece'+this.i+'_'+this.j).src=this.getImg();
	},
	
	showPossibilities:function(){
		
		i=this.i;
		j=this.j;
		
		if( this.getName()=='P' ){//pion
			if( this.getColor()=='B'){//black
				game.cocheDeplacement(i+1,j);
				game.cocheAttack(i+1,j+1);
				game.cocheAttack(i+1,j-1);
				
				if(i==1){
				game.cocheDeplacement(i+2,j);
				}
				
			}else{
				game.cocheDeplacement(i-1,j);
				game.cocheAttack(i-1,j+1);
				game.cocheAttack(i-1,j-1);
				
				if(i==6){
				game.cocheDeplacement(i-2,j);
				}
			}
		}else if( this.getName()=='C'){//cavalier
			game.coche(i+2,j+1);
			game.coche(i+2,j-1);

			game.coche(i-2,j+1);
			game.coche(i-2,j-1);
		}else if( this.getName()=='K'){//roi
			game.coche(i+1,j);
			game.coche(i-1,j);

			game.coche(i,j+1);
			game.coche(i,j-1);
			game.coche(i+1,j+1);
			game.coche(i-1,j-1);
			game.coche(i+1,j-1);
			game.coche(i+1,j-1);
		}else if( this.getName()=='T'){//tour
			var dir1=true;
			var dir2=true;
			var dir3=true;
			var dir4=true;
			for(k=1;k<8;k++){
				if(dir1){ dir1=game.coche(i+k,j);}
				if(dir2){ dir2=game.coche(i-k,j);}
				if(dir3){ dir3=game.coche(i,j+k);}
				if(dir4){ dir4=game.coche(i,j-k);}
			}
		}else if( this.getName()=='F'){//fou
			var dir1=true;
			var dir2=true;
			var dir3=true;
			var dir4=true;
			for(k=1;k<8;k++){
				if(dir1){ dir1=game.coche(i+k,j+k);}
				if(dir2){ dir2=game.coche(i-k,j-k);}
				if(dir3){ dir3=game.coche(i-k,j+k);}
				if(dir4){ dir4=game.coche(i+k,j-k);}
			}
		}else if( this.getName()=='Q'){//dame
			var dir1=true;
			var dir2=true;
			var dir3=true;
			var dir4=true;
			var dir5=true;
			var dir6=true;
			var dir7=true;
			var dir8=true;
			for(k=1;k<8;k++){
				if(dir1){ dir1=game.coche(i+k,j+k);}
				if(dir2){ dir2=game.coche(i-k,j-k);}
				if(dir3){ dir3=game.coche(i-k,j+k);}
				if(dir4){ dir4=game.coche(i+k,j-k);}
				if(dir5){ dir5=game.coche(i+k,j);}
				if(dir6){ dir6=game.coche(i-k,j);}
				if(dir7){ dir7=game.coche(i,j+k);}
				if(dir8){ dir8=game.coche(i,j-k);}
			}
		}	
	},
	moveTo:function(i,j){
		
		if(!game.tPiece[i][j].isEmpty() && game.tPiece[i][j].getColor()!=game.tour && game.tPiece[i][j].getName()=='K'){
			game.gameover=1;
		}
		
		game.tPiece[i][j].createFrom(this.getColor()+this.getName());
		game.tPiece[this.i][this.j].reset();
		
		if(game.gameover==1){
			game.winTour();
		}
	}
	
};


//GAME
function Game(){
	this.tab=[
		['BT','BF','BC','BQ','BK','BC','BF','BT'],
		['BP','BP','BP','BP','BP','BP','BP','BP'],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		['WP','WP','WP','WP','WP','WP','WP','WP'],
		['WT','WF','WC','WQ','WK','WC','WF','WT'],
		
	];
	
	this.tPiece=[
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
	];;
	
	this.tBlackWhite=[
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0],
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0],
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0],
		[0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0],
	];
	
	this.tCoche=[
		[0,0,0,0,0,0,0,0],
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
	
	this.decalageY=60;
	
	this.selectedCaseI=0;
	this.selectedCaseJ=0;
	
	this.tour='B';
	
	this.gameover=0;

	this.installed=0;
}
Game.prototype={
	
	winTour:function(){
		this.resetAllCoche();
			
		this.resetAllCases();
		this.rebuildPions();
		
		getById('tourcolor').innerHTML='<img src="img/'+this.tour+'Pwin.png"/>';
		
		alert('Game Over');
		load();
	},
	resetAllCoche:function(){
		this.tCoche=[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
		];
	},
	install:function(){
		
		var shtml='';
			
		for(i=0;i<this.tab.length;i++){
			for(j=0;j<this.tab[0].length;j++){
						
				//ifond= this.tab[i][j] ;
				var y=40*i+this.decalageY;
				var x=40*j;
				
				if( this.tBlackWhite[i][j] ){
					couleurcase='blanche';
				}else{
					couleurcase='noir';
				}
			
				
				shtml+='<img id="case'+i+'_'+j+'" style="top:'+y+'px;left:'+x+'px" src="img/case-'+couleurcase+'.png" class="case" />';
				
			}
		}
		
		getById('content').innerHTML=shtml;
	},	
	installperson:function(){
		
		var shtml='';
		
		for(i=0;i<this.tab.length;i++){
			for(j=0;j<this.tab[0].length;j++){
				var oPiece=new Piece;
				oPiece.createFrom(this.tab[i][j]);
				oPiece.setCoord(i,j);
				this.tPiece[i][j]=oPiece;
			}
		}
		
		
		for(i=0;i<this.tab.length;i++){
			for(j=0;j<this.tab[0].length;j++){
						
				var y=40*i+this.decalageY-18;
				var x=40*j;
				
				shtml+='<img id="piece'+i+'_'+j+'" style="top:'+y+'px;left:'+x+'px" src="'+this.tPiece[i][j].getImg()+'" class="pions" />';
				
			}
		}
		
		getById('content').innerHTML+=shtml;
	},
	installclic:function(){
		
		var shtml='';
		
		var couleurcase='blanche';
		
		for(i=0;i<this.tab.length;i++){
			for(j=0;j<this.tab[0].length;j++){
						
				//ifond= this.tab[i][j] ;
				var y=40*i+this.decalageY;
				var x=40*j;
				
				shtml+='<a href="#" onclick="game.selectCase('+i+','+j+');return false;"><img style="top:'+y+'px;left:'+x+'px" src="img/case-vide.png" class="case" /></a>';
				
			}
		}
		
		getById('content').innerHTML+=shtml;
	},
	resetCase:function(i,j){
		if(this.tBlackWhite[this.selectedCaseI][this.selectedCaseJ] ){
			getById('case'+this.selectedCaseI+'_'+this.selectedCaseJ).src='img/case-blanche.png';
		}else{
			getById('case'+this.selectedCaseI+'_'+this.selectedCaseJ).src='img/case-noir.png';
		}
	},
	resetAllCases:function(){
		for(i=0;i<this.tab.length;i++){
			for(j=0;j<this.tab[0].length;j++){
				if(this.tBlackWhite[i][j] ){
					getById('case'+i+'_'+j).src='img/case-blanche.png';
				}else{
					getById('case'+i+'_'+j).src='img/case-noir.png';
				}
			}
		}
	},
	rebuildPions:function(){
		for(i=0;i<this.tPiece.length;i++){
			for(j=0;j<this.tPiece[0].length;j++){
						
				if(!this.tPiece[i][j].isEmpty()){
					this.tPiece[i][j].reload();
				}else{
					getById('piece'+i+'_'+j).src='img/case-vide.png';
				}
				
			}
		}
	},
	canMoveTo:function(i,j){
		
		if(!this.tCoche[i][j]){
			return false;
		}
		
		this.tPiece[this.selectedCaseI][this.selectedCaseJ].moveTo(i,j);
		
		if(this.gameover==0){
			//this.tPiece[i][j]=this.tPiece[this.selectedCaseI][this.selectedCaseJ];
			//this.tPiece[this.selectedCaseI][this.selectedCaseJ]=0;
			this.selectedCaseI=0;
			this.selectedCaseJ=0;
			game.resetAllCoche();
			
			game.resetAllCases();
			this.rebuildPions();
		
			this.switchTour();
		}
		
	},
	switchTour:function(){
		if(this.tour=='B'){
			this.tour='W';
		}else{
			this.tour='B';
		}

		if(this.tour!=player){
			oInterval=setInterval(reimport,8000);
			getById('avous').style.visibility='hidden';
		}else{
			clearInterval(oInterval);
			getById('avous').style.visibility='visible';
		}

		if(this.installed){
			this.sendTabToNetwork();
		}

		if(this.tour=='W'){
			getById('tourcolor').innerHTML='<img src="img/WPface.png"/>';//blanc
		}else{
			getById('tourcolor').innerHTML='<img src="img/BP.png"/>';//noir
		}
	},
	loadTour:function(){
		if(this.tour=='W'){
			getById('tourcolor').innerHTML='<img src="img/WPface.png"/>';//blanc
		}else{
			getById('tourcolor').innerHTML='<img src="img/BP.png"/>';//noir
		}

		if(this.tour!=player){
			oInterval=setInterval(reimport,8000);
			getById('avous').style.visibility='hidden';
		}else{
			clearInterval(oInterval);
			getById('avous').style.visibility='visible';
		}
	},
	selectCase:function(i,j){
		
		if(this.canMoveTo(i,j)){
			return false;
		}
		
		if(this.tPiece[i][j].isEmpty()){
			return false;
		}
		
		if(this.tPiece[i][j].getColor()!=this.tour){
			return false;
		}
		if(this.tour!=player){
			alert('Ce n est pas votre tour');
			return false;
		}
		
		game.resetAllCoche();
		game.resetAllCases();
		
		if(this.tBlackWhite[i][j] ){
			getById('case'+i+'_'+j).src='img/case-blanche-selected.png';
		}else{
			getById('case'+i+'_'+j).src='img/case-noir-selected.png';
		}
		this.selectedCaseI=i;
		this.selectedCaseJ=j;
		
		this.selectPiece(i,j);
		
	},
	verifCoord:function(i,j){
		if(i<0 || j<0){
			return false;
		}
		if(i>=this.tab.length || j>=this.tab[0].length){
			return false;
		}
		return true;
	},
	selectPiece:function(i,j){
			
		//piece=this.tab[i][j].substr(1,1);
		//color=this.tab[i][j].substr(0,1);
		
		this.tPiece[i][j].showPossibilities();
	},
	cocheDeplacement:function(i,j){
		if(!this.verifCoord(i,j)){ return false; }
		
		if(this.tPiece[i][j].isEmpty() ){
			if(this.tBlackWhite[i][j] ){
				getById('case'+i+'_'+j).src='img/case-blanche-deplacement.png';
			}else{
				getById('case'+i+'_'+j).src='img/case-noir-deplacement.png';
			}
			this.tCoche[i][j]=1;
			return true;
		}
		return false;
	},
	cocheAttack:function(i,j){
		if(!this.verifCoord(i,j)){ return false; }
		
		if(!this.tPiece[i][j].isEmpty() && this.tPiece[i][j].getColor()!=this.tour){
			if(this.tBlackWhite[i][j] ){
				getById('case'+i+'_'+j).src='img/case-blanche-attack.png';
			}else{
				getById('case'+i+'_'+j).src='img/case-noir-attack.png';
			}
			this.tCoche[i][j]=1;
			return true;
		}
		return false;
	},
	coche:function(i,j){
		
		if(!this.verifCoord(i,j)){ return false; }
		
		if(this.tPiece[i][j].isEmpty() ){
			if(this.tBlackWhite[i][j] ){
				getById('case'+i+'_'+j).src='img/case-blanche-deplacement.png';
			}else{
				getById('case'+i+'_'+j).src='img/case-noir-deplacement.png';
			}
			this.tCoche[i][j]=1;
			return true;
		}else if(this.tPiece[i][j].getColor()!=this.tour){
			if(this.tBlackWhite[i][j] ){
				getById('case'+i+'_'+j).src='img/case-blanche-attack.png';
			}else{
				getById('case'+i+'_'+j).src='img/case-noir-attack.png';
			}
			this.tCoche[i][j]=1;
			return false;
		}
		
		return false;
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

	sendTabToNetwork:function(){
		var sShare='';
		for(i=0;i<this.tab.length;i++){
			for(j=0;j<this.tab[0].length;j++){
				if(this.tPiece[i][j].getColor()+this.tPiece[i][j].getName()=='case-vide'){
					sShare+='0;';
				}else{
					sShare+=this.tPiece[i][j].getColor()+this.tPiece[i][j].getName() + ";";
				}
			}
			sShare += "\n";
		}
		var a=getById('share');
		if(a){
			a.value=sShare;
		}

		var b=getById('id');
		if(b){
			b.value=id;
		}

		var c=getById('tourform');
		if(c){
			c.value=this.tour;
		}


		var bform=getById('formshare');
		if(bform){
			bform.submit();
		}else{
			document.forms['formshare'].submit();
		}
	}
	
	
};

function debug(txt){
	getById('debug').value+=txt;
}


