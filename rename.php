<?php 
$tFile=scandir('.');
foreach($tFile as $sFile){
	if(substr(basename($sFile),0,1)=='.' or substr($sFile,-3)=='php'){
		continue;
	}


	system('mv '.$sFile.' '.str_replace('cache_global_default_','',$sFile) );

}
