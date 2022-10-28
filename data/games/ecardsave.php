<?php if(!isset($_POST['form_corps'])){ die('Error'); }
$tFile=file('data/ecard/max.txt');

$max=(int)$tFile[0];

$data='';

$_POST['form_txt']=preg_replace('/\n/','#RETOUR',$_POST['form_txt']);

$tVar=array('corps','cape','col','tete','bandeau','yeux','txt');
foreach($tVar as $var){
$data.=$var.':'.$_POST['form_'.$var]."\n";
}

$open=fopen('data/ecard/'.$max.'.txt','w');
fputs($open,$data);
fclose($open);

$open=fopen('data/ecard/max.txt','w+');
fputs($open,($max+1));
fclose($open);

include('../../plugin/plugin_mail.php');

$sBody=' http://supercapote.com/ecard_'.$max.'.html ';

$oMail=new plugin_mail;
$oMail->setFrom('Supercapote.com','supercapote@supercapote.com');
$oMail->addTo($_POST['mail']);
$oMail->setTitle('Une carte supercapote vous attend');
$oMail->setBodyHtml($sBody);
$oMail->send();

header('Location:ecardload.php?id='.$max);exit;
?>
