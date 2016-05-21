 <div class="comment_div">
 	<?php
        $profile_path = '../../ch/img/no_img/no_img_user1.jpg';
        $username = "Admin_User";
        $comment_content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        $time = '00';
    ?>
    <figure class="comment_pic">
        <img src="<?=$profile_path?>">
    </figure>
    <h4><?=$username?></h4>
    <p class="comment_contents"><?=$comment_content?></p>
    <p class="comment_time"><span class="comment_time_counter"><?=$time?></span> minute ago</p>
</div>