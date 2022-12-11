var _context;
var _example;

/*global_vars*/
var canvas;
var game;
var timer = "";
var draw_constraints = false;
var draw_points = true;

var perso;

var timer;
var timer2;

var step=5;

var ghost;
var ghost2;
var ghost3;

function load(){
    //clearInterval(timer);

    canvas = new Canvas('canvas');
    canvas.width=360;
    canvas.height=200;
    game= new Game();
    game.build();
    
    perso=new Perso();
    perso.i=0;
    perso.j=4;
    perso.x=0;
    perso.y=4*20;
    
    perso.start();
    
    ghost=new Ghost('ghost');
    
    ghost2=new Ghost('ghost2');
    ghost2.move( 20*10,0);
    
    ghost3=new Ghost('ghost3');
    ghost3.move( 20*10,20*4);
    
    
    //run();
    timer2=setInterval('maj()',250)
}

function run(){

	canvas.clear();
	//game.clear();
	
	game.build();
}

function maj(){
	ghost.play();
	ghost2.play();
	ghost3.play();
	
	game.build();
}

function gameover(){
	getById('gameover').innerHTML='Game Over';
	clearInterval(timer2);
	perso.end();
}
function youwin(){
	getById('gameover').innerHTML='You Win';
	clearInterval(timer2);
	perso.end();
}
 

//GAME
function Game(){
    this.tab=[
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,0,0,1],
        [1,1,1,1,1,0,1,1,1,1,0,0,0,1,1,1,1,1],
	[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];
    
    this.tPoint=[
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,0,0,1],
        [1,1,1,1,1,0,1,1,1,1,0,0,0,1,1,1,1,1],
	[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];
    
    this.point='';
    this.x=-1;
    this.y=-1.
    
    this.i=-1;
    this.j=-1;
    
this.ilargeur=20;
this.ihauteur=20;
   
}
Game.prototype={
   
    build: function(){
       
       noirblanc=0;
        
       gagne=1;
       
        for(var i=0;i< this.tab.length;i++){
            for(var j=0;j< this.tab[0].length;j++){
                
                _x=( j* this.ilargeur );
                _y=( i* this.ihauteur);
                fond='#4c4949';
		contour='#4c4949';
		
		if(this.tab[i][j]==1){
			fond='#222';
			contour='#ccc';
		}

                canvas.drawRect( _x ,_y ,this.ilargeur,this.ihauteur,contour,fond);
		
		if(this.tPoint[i][j]==1){
			canvas.drawRect(_x+8,_y+8,3,3,'#edef1c','#edef1c');
			gagne=0;
		}
                
        }
	}
	if(gagne==1){
		youwin();
	}
    }
    ,
    check:function(i,j){
	if(!this.tab[i] ){
		return false;
	}
	
	    
	if(this.tab[i][j]==1){
		//alert(this.tab[i][j]);
		return true;
	}
	return false;
    }
   
};


function Ghost(id){
	this.id=id;
	
	this.lastSens='';
	this.nextSens='';
	this.sens='bas';
	this.tmpSens='';
	
	this.i=0;
	this.j=0;
	
	this.x=0;
	this.y=0;
	
	this.ihauteur=20;
	this.ilargeur=20;
}
Ghost.prototype={
	check:function(x,y){
		
		if(y<0){ return false;}
		if(x<0){ return false;}
		
		var j=Math.ceil( ( (x)/this.ilargeur));
		var i=Math.ceil( ( (y)/this.ihauteur));
		
		
		if(game.check(i,j)){
			this.i=i;
			this.j=j;
			
			return true;
		}
		return false;
		
	}
	,
	move:function(x,y){
		
		if(!this.check(x,y) ){ return ; }
		
		this.x=x;
		this.y=y;
		
		getById(this.id).style.top=y+'px';
		getById(this.id).style.left=x+'px';
		
		if(this.i==perso.i && this.j==perso.j){
			gameover();
		}
		
	}
	,
	findDirectionVert:function(){
		if( this.j == perso.j){
			if(this.i < perso.i && this.checkDirection('bas')){
				this.tmpSens='bas';
			}else{
				this.tmpSens='haut';
			}
		}
		else if( this.j < perso.j ){
			if(this.i < perso.i && this.checkDirection('bas')){
				this.tmpSens='bas';
			}else{
				this.tmpSens='haut';
			}
		}else{
			if(this.i < perso.i && this.checkDirection('bas')){
				this.tmpSens='bas';
			}else{
				this.tmpSens='haut';
			}
		}
	}
	,
	play:function(){
	
		if(this.checkDirection(this.sens) && !this.canChangeDirection(this.nextSens)){
		}else if(perso.j == this.j){
			this.findDirectionVert();
		}else if( this.j > perso.j ){
			if(this.checkDirection('gauche')){
				this.tmpSens='gauche';
			}else{
				this.findDirectionVert();
			}
			
		}else{
			if(this.checkDirection('droite')){
				this.tmpSens='droite';
			}else{
				this.findDirectionVert();
			}
			
		}
		
		
		if(this.tmpSens==this.sens){
			this.nextSens='';
			//this.sens=this.tmpSens;
		}else{
			this.nextSens=this.tmpSens;
		}
		
		
		
		if(this.nextSens!=''){
			if(this.canChangeDirection(this.nextSens) &&  this.checkDirection(this.nextSens)){
				this.sens=this.nextSens;
			}
		}
		//this.nextSens=''
		
		
		
		if(this.checkDirection(this.sens)){
			this.goDirection(this.sens);
		}
		
		
		getById('debug').value=this.sens+' '+this.nextSens;
		
	}
	,
	canChangeDirection:function(sens){
		if(sens=='bas' || sens=='haut'){
			if( (this.x)%this.ilargeur == 0){
				if(sens=='bas'){
					return game.check(this.i+1,this.j);
				}else{
					return game.check(this.i-1,this.j);
				}
			}
		}else if(sens=='gauche' || sens=='droite'){
			if( ((this.y)%this.ihauteur) == 0){
				if(sens=='gauche'){
					return game.check(this.i,this.j-1);
				}else{
					//alert('test droite'+i+' '+j);
					return game.check(this.i,this.j+1);
				}
			}
		}
		return false;
	}
	,
	checkDirection:function(sens){
		
		
		if(this.x%this.ilargeur > 0){return true;}
		if(this.y%this.ihauteur > 0){return true;}
	
		if(sens=='bas'){
			if(this.lastSens=='haut') return false;
			if(game.check(this.i+1,this.j)) return true;
		}else if(sens=='haut'){
			if(this.lastSens=='bas') return false;
			if(game.check(this.i-1,this.j)) return true;
		}else if(sens=='gauche'){
			if(this.lastSens=='droite') return false;
			if(game.check(this.i,this.j-1)) return true;
		}else if(sens=='droite'){
			if(this.lastSens=='gauche') return false;
			if(game.check(this.i,this.j+1)) return true;
		}
		return false;
	}
	,
	goDirection:function(sens){
		if(this.sens=='bas'){
			this.move(this.x,this.y+step);
		}else if(this.sens=='haut'){
			this.move(this.x,this.y-step);
		}else if(this.sens=='gauche'){
			this.move(this.x-step,this.y);
		}else if(this.sens=='droite'){
			this.move(this.x+step,this.y);
		}
		
		
		
		
		this.lastSens=sens;
	}
	,
	setNextSens:function(sens){
		this.nextSens=sens;
	}
	,
	setSens:function(sens){
		this.sens=sens;
	}
};


function Perso(){
	this.nextSens='';
	this.sens='bas';
	this.i=0;
	this.j=0;
	
	this.x=0;
	this.y=0;
	
	this.ihauteur=20;
	this.ilargeur=20;
}
Perso.prototype={
	
	start:function(){
		timer = setInterval('perso.play()', 100);
	}
	,
	end:function(){
		clearInterval(timer);
	}
	,
	check:function(x,y){
		
		if(y<0){ return false;}
		if(x<0){ return false;}
		
		var j=Math.ceil( ( (x)/this.ilargeur));
		var i=Math.ceil( ( (y)/this.ihauteur));
		
		
		if(game.check(i,j)){
			this.i=i;
			this.j=j;
			
			getById('txti').innerHTML=this.i;
			getById('txtj').innerHTML=this.j;
			
			return true;
		}
		return false;
		
	}
	,
	move:function(x,y){
		
		if(!this.check(x,y) ){ return ; }
		
		this.x=x;
		this.y=y;
		
		this.j=Math.ceil( ( (x)/this.ilargeur));
		this.i=Math.ceil( ( (y)/this.ihauteur));
		//alert(x+' '+y);
		
		getById('perso').style.top=y+'px';
		getById('perso').style.left=x+'px';
		
		if(game.tPoint[this.i] && game.tPoint[this.i][this.j] && game.tPoint[this.i][this.j]==1){
			game.tPoint[this.i][this.j]=0;
		}
	}
	,
	play:function(){
		
		if(this.nextSens!=''){
			if(this.canChangeDirection(this.nextSens) && this.checkDirection(this.nextSens)){
				this.sens=this.nextSens;
			}
		}
		
		if(this.checkDirection(this.sens)){
			this.goDirection(this.sens);
		}
	}
	,
	canChangeDirection:function(sens){
		if(sens=='bas' || sens=='haut'){
			if( (this.x)%this.ilargeur == 0){
				if(sens=='bas'){
					return game.check(this.i+1,this.j);
				}else{
					return game.check(this.i-1,this.j);
				}
			}
		}else if(sens=='gauche' || sens=='droite'){
			if( ((this.y)%this.ihauteur) == 0){
				if(sens=='gauche'){
					return game.check(this.i,this.j-1);
				}else{
					//alert('test droite'+i+' '+j);
					return game.check(this.i,this.j+1);
				}
			}
		}
		return false;
	}
	,
	checkDirection:function(sens){
		
	
		if(this.x%this.ilargeur > 0){return true;}
		if(this.y%this.ihauteur > 0){return true;}
	
		if(sens=='bas'){
			if(game.check(this.i+1,this.j)) return true;
		}else if(sens=='haut'){
			if(game.check(this.i-1,this.j)) return true;
		}else if(sens=='gauche'){
			if(game.check(this.i,this.j-1)) return true;
		}else if(sens=='droite'){
			if(game.check(this.i,this.j+1)) return true;
		}
		return false;
	}
	,
	goDirection:function(sens){
		if(this.sens=='bas'){
			this.move(this.x,this.y+step);
		}else if(this.sens=='haut'){
			this.move(this.x,this.y-step);
		}else if(this.sens=='gauche'){
			this.move(this.x-step,this.y);
		}else if(this.sens=='droite'){
			this.move(this.x+step,this.y);
		}
	}
	,
	setNextSens:function(sens){
		this.nextSens=sens;
	}
	,
	setSens:function(sens){
		this.sens=sens;
	}
};

 


document.onkeydown=function(event){
    if(event != null){
        if(event.keyCode == 37){ //gauche
		perso.setNextSens('gauche');
        }else if(event.keyCode == 38){ //haut
		perso.setNextSens('haut');
        }else if(event.keyCode == 39){ //droite
		perso.setNextSens('droite');
	}else if(event.keyCode == 40){ //bas
		perso.setNextSens('bas');
        }
	
       
    }else{
       
    }

}
