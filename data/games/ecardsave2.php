<?php if(!isset($_POST['form_corps'])){ die('Error'); }
$tFile=file('data/ecard2/max.txt');

$max=(int)$tFile[0];

$data='img:'.$_POST['img']."\n";


$open=fopen('data/ecard2/'.$max.'.txt','w');
fputs($open,$data);
fclose($open);

$open=fopen('data/ecard2/max.txt','w+');
fputs($open,($max+1));
fclose($open);

include('../../plugin/plugin_mail.php');

$ret="\n";

$sBody='<html>'.$ret;
$sBody.='<body>'.$ret;
$sBody.='<img src="'.$_POST['img'].'" /> <br />'.$ret;
$sBody.=' http://supercapote.com/ecard2_'.$max.'.html >';
$sBody.='</body>'.$ret;
$sBody.='</html>';

$oMail=new plugin_mail;
$oMail->setFrom('Supercapote.com','supercapote@supercapote.com');
$oMail->addTo($_POST['mail']);
$oMail->setTitle('Une carte supercapote vous attend');
$oMail->setBodyHtml($sBody);
$oMail->send();

header('Location:ecardload2.php?id='.$max);exit;
?>
