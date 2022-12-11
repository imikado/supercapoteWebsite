var canvas;
var context;

var tType=Array(
'cape',
'corps',
'col',
'tete',
'bandeau',
'yeux',
'sourcils'
);


var tChoix=Array();
for(var i=0;i < tType.length; i++){
tChoix[ tType[i] ]=0;
}

var tMax=Array();
tMax['cape']=5;
tMax['corps']=5;
tMax['col']=5;
tMax['tete']=5;
tMax['bandeau']=6;
tMax['yeux']=5;
tMax['sourcils']=5;


var iType=0;

function load(){
	canvas = new Canvas('canvas');
	canvas.width=600;
	canvas.height=600;
	
	buildListRadio();

	writeText();

	show();
}

function show(){
	canvas.clear();
	nextLoad();
	writeBulle();
}

function nextLoad(){
	loadImgPerso( tType[iType] , tChoix[ tType[iType] ] );
	iType++;
	if(iType > tType.length){
		iType=0;
	}
}

function writeBulle(){
	loadImgBulle();
}

function writeText(){
	canvas.ctx.font = "16pt Calibri";

	var sText=getById('texte').value;
	var tTexte=Array();
	tTexte=sText.split('\n');
	var x=350;
	var y=50;
	for(var i=0;i<tTexte.length;i++){
		canvas.fillText(x,(y+(i*22)),tTexte[i] );
	}
}

function loadImgBulle(){
	var img = new Image();
	img.onload = function() {
		canvas.drawImage(img, 300, 10);
		writeText();
	}
	img.src = 'img/ecard-bulle.png';
}

function loadImgPerso(stype_,schoix_){
	// Create a new image.
	  var img = new Image();

	// Once it's loaded draw the image on the canvas.
	img.onload = function() {

		// Original resolution: x, y.
		canvas.drawImage(img, 0, 0);
		nextLoad();

	  };

	  img.src = 'img/ecard-' + stype_ + '-' + schoix_ + '.png';
}

function choose(sType_,value_){
	tChoix[ sType_ ]=value_;
	show();
}

function buildListRadio(){
	var sHtml='';

	sHtml+='<table>';

	for(var i=0;i<tType.length;i++){
		var sType=tType[i];
		var maxi=tMax[sType];

		sHtml+='<tr>';
			sHtml+='<th>'+sType+'</th>';
			sHtml+='<td>';

			for(var j=0;j<maxi;j++){
				sHtml+='<input '; if(j==0){ sHtml+=' checked="checked" '; } sHtml+=' onclick="choose(\''+sType+'\',this.value)" type="radio" name="'+sType+'" value="'+j+'" />';
			}

			sHtml+='</td>';
		sHtml+='</tr>';
	}
	sHtml+='</table>';

	getById('content').innerHTML=sHtml;
	
}


