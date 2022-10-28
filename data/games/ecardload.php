<?php
function formate($txt){
	return preg_replace('/#RETOUR/','<br />',$txt);
}

if(!isset($_GET['id'])){
	die('id inconnu');
}

$id=(int)$_GET['id'];

$tFile=file('data/ecard/'.$id.'.txt');
foreach($tFile as $line){
	if(!preg_match('/:/',$line)) continue;
	list($var,$val)=preg_split('/:/',$line);
	$tProperties[trim($var)]=trim(formate($val));
}

$tProperties['cape']=(int)$tProperties['cape'];
$tProperties['corps']=(int)$tProperties['corps'];
$tProperties['col']=(int)$tProperties['col'];
$tProperties['tete']=(int)$tProperties['tete'];
$tProperties['bandeau']=(int)$tProperties['bandeau'];
$tProperties['yeux']=(int)$tProperties['yeux'];

?><!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>titre du site</title>
 
    <!-- meta -->
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta name="author" content="" />

<script src="lib/main.js"></script>
<script src="lib/canvas.js"></script>
<script src="ecard.js"></script>


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

<img src="img/ecard-bulle.png" id="bulle"/>
<div id="bulle_txt"><?php echo $tProperties['txt']?></div>


<div>

<div id="perso">
	<img src="img/ecard-cape-<?php echo $tProperties['cape']?>.png" id="cape"/>
	<img src="img/ecard-corps-<?php echo $tProperties['corps']?>.png" id="corps"/>
	<img src="img/ecard-col-<?php echo $tProperties['col']?>.png" id="col"/>
	<img src="img/ecard-tete-<?php echo $tProperties['tete']?>.png" id="tete"/>
	<img src="img/ecard-bandeau-<?php echo $tProperties['bandeau']?>.png" id="bandeau"/>
	<img src="img/ecard-yeux-<?php echo $tProperties['yeux']?>.png" id="yeux"/>
</div>


</div>


</body>
</html>


