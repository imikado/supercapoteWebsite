var max=4;

function change(element,side){
	var a=getById(element);
	
	var src=a.src;
	var tab=src.split('-');

	var max=tab.length;

	var tab1=tab[max-1].split('.');
	
	var nb=tab1[0];
	
	if(side=='left'){
		nb--;
	}else{
		nb++;
	}
	
	
	if(nb<0 || nb >max){
		return;
	}
	
	a.src='img/ecard-'+element+'-'+nb+'.png';
	
	var input=getById('form_'+element);
	if(input){
		input.value=nb;
	}
}
function majTxt(object){
	var a=getById('bulle_txt');
	
	if(a){
		var reg=new RegExp('\n','g');
		
		var sTxt=object.value;
		sTxt=sTxt.replace(reg,'<br />');
		a.innerHTML=sTxt;
	}

}
