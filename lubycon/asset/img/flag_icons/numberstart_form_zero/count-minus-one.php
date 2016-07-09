<?php

for( $i=0 ; $i<240 ; $i++  )
{
    $j = $i+1;
    copy( $j.'.png' , "$i.png" );
    unlink( $j.'.png');

}

?>