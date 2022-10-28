<?php if(!isset($_GET['action'])){
die('error no action');
}elseif($_GET['action']=='export'){

	if(!isset($_POST['share'])){ die('Error'); }

	if(!isset($_POST['id'])){ die('Error id'); }
	if(!isset($_POST['tour'])){ die('Error tour'); }


	$id=(int)$_POST['id'];
	$tour=$_POST['tour'];
		
	$data=$_POST['share'];

	$open=fopen('data/echec/partie_'.$id.'.txt','w');
	
	fputs($open,$tour."\n".$data);
	fclose($open);


	print "saved $id ".date('h:i:s');

}else if($_GET['action']=='import'){
	if(!isset($_GET['id'])){ die('Error id'); }
	$id=$_GET['id'];

	$tFile=file('data/echec/partie_'.$id.'.txt');
	
	foreach($tFile as $i => $line){
		if($i==0){
			$sTour=trim($line);
			
		}elseif($i>7){ 
			break;		
		}else{
			$i2=$i-1;
			$tCase=preg_split('/;/',$line);
			foreach($tCase as $j => $case){
				if($j > 7){ continue; }
				$case=trim($case);
				echo '<script>parent.loadPiece('.$i2.','.$j.',\''.$case.'\');</script>';
			}
		}
	}
	echo '<script>parent.setTour(\''.$sTour.'\');</script>';
	echo '<script>parent.rebuildPions();</script>';

}elseif($_GET['action']=='join'){

if(!isset($_POST['partie'])){ die('Error id partie'); }
$id=(int)$_POST['partie'];

if(!file_exists('data/echec/partie_'.$id.'.txt')){ 
	
	echo '<html><head><style>
	*{ font-family:arial; }
	p{
	margin-top:40px;
	text-align:center;
	}
	.btn{
	border:3px solid gray;
	padding:12px 60px;
	background:#444 url(\'img/BP.png\') no-repeat 0px -2px;
	color:white;
	font-weight:bold;
	cursor:pointer;
	text-decoration:none;
	}
	</style></head>
	<body>
		<p>Erreur: partie inconnu</p>
		<p>
		<a class="btn" href="echec3network.html">Retour au menu</a>
		</p>
	</body>
	</html>';
	exit;
}



header('Location:echec3networkW.html?id'.$id);exit;
}elseif($_GET['action']=='create'){
	$tFile=file('data/echec/max.txt');
	$max=(int)$tFile[0];

	$max++;
	$id=$max;
	
	$tour='B';
	$data='BT;BF;BC;BQ;BK;BC;BF;BT;'."\n";
	$data.='BP;BP;BP;BP;BP;BP;BP;BP;'."\n";
	$data.='0;0;0;0;0;0;0;0;'."\n";
	$data.='0;0;0;0;0;0;0;0;'."\n";
	$data.='0;0;0;0;0;0;0;0;'."\n";
	$data.='0;0;0;0;0;0;0;0;'."\n";
	$data.='WP;WP;WP;WP;WP;WP;WP;WP;'."\n";
	$data.='WT;WF;WC;WQ;WK;WC;WF;WT;'."\n";

	$open=fopen('data/echec/partie_'.$id.'.txt','w');
	fputs($open,$tour."\n".$data);
	fclose($open);	

	$open=fopen('data/echec/max.txt','w');
	fputs($open,$id);
	fclose($open);

	header('Location:echec3networkB.html?id'.$id);exit;
}
