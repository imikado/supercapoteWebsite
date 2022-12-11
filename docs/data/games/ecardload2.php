<?php
if(isset($_GET['id'])){
	$id=(int)$_GET['id'];
	
	$tFile=file('data/ecard2/'.$id.'.txt');
	foreach($tFile as $line){
		if(!preg_match('/:/',$line)) continue;
		list($var,$val)=preg_split('/:/',$line);
		$tProperties[trim($var)]=trim(formate($val));
	}
}else{
die('id inconnu');
}
?><!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>titre du site</title>
 
    <!-- meta -->
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta name="author" content="" />




<style>
*{
font-family:arial;
font-size:12px;
margin:0px;
}
#point{
position:absolute;
width:2px;
height:2px;
background:red;
}
#pointhaut{
position:absolute;
width:2px;
height:2px;
background:blue;

}
#pointbas{
position:absolute;
width:2px;
height:2px;
background:orange;

}
#debug{
width:60%;
height:400px;
display:none;
}
#tour{
position:absolute;
}
#jeu{
position:absolute;
}
.pions{
position:absolute;
}
#i{
position:absolute;
left:750px;
}
#j{
position:absolute;
left:750px;
top:20px;
}

#perso{
position:absolute;
top:0px;
left:0px;
width:300px;
height:450px;
}
#perso img{
position:absolute;
top:0px;
}
#menu{
position:absolute;
top:0px;
left:300px;
border:1px solid gray;
}
#bulle{
position:absolute;
top:0px;
left:300px;

}
#bulle_txt{
position:absolute;
top:30px;
left:350px;
border:0px solid red;
width:196px;
height:128px;
text-align:center;
}
</style>
</head>
<body>



<div id="perso">
	<img src="<?php echo $tProperties['img']?>"/>
</div>


</div>


</body>
</html>


