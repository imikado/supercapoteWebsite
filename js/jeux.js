function chooseGame(game,width,height){

	a=getById('popup');
	if(a){
		a.style.display='block';


		b=getById('gamesrc');
		b.src='../data/games/'+game;

		b.width=width+'px';
		b.height=height+'px';

		b.focus();
	}
}
function chooseBd(id){
	a=getById('popup');
	if(a){
		a.style.display='block';


		b=getById('imgsrc');
		b.src='../data/img/comicstrip/'+id;
	}
}
function chooseMovie(id){
	a=getById('popup');
	if(a){
		a.style.display='block';

		b=getById('moviesrc');

		if(b){

		      sHtml='<object style="height: 390px; width: 640px">';
		      sHtml+='<param name="movie" value="http://www.youtube.com/v/'+id+'?version=3">';
		      sHtml+='<param name="allowFullScreen" value="true">';
		      sHtml+='<param name="allowScriptAccess" value="always">';
		      sHtml+='<embed src="http://www.youtube.com/v/'+id+'?version=3" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="390">';
		      sHtml+='</object>';
		      b.innerHTML=sHtml;
		}
	}
}
