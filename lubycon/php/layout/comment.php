 <div class="comment-div">
 	<?php
        $profile_path = '../../ch/img/no_img/no_img_user1.jpg';
        $comment_write_username = "Admin_User";
        $comment_content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        $time = '00';
    ?>
    <figure class="comment-pic">
        <img src="<?=$profile_path?>">
    </figure>
    <h4><?=$comment_write_username?></h4>
    <p class="comment-time"><span class="comment-time-counter"><?=$time?></span> minute ago</p>
    <p class="comment-contents"><?=$comment_content?></p>
    
</div>