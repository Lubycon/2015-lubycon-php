<?php
    $post_number = $_POST['post_number'];
    $third_param = $_POST['third_param'];
    $j = $_POST['post_number'];
    for($i= $post_number ; $i<$post_number+30 ;$i++){
        $j++;
        include('../layout/community_card.php');
    }
    sleep(2);
?>

       