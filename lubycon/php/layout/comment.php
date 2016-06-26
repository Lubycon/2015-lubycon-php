 <div class="comment-div">
 	<?php
        $profile_path = "../../../../Lubycon_Contents/user/".$comment_row['userCode']."/profile.jpg";
        $comment_write_username = $comment_row['nick'];
        $comment_content = $comment_row['commentContents'];
        $time = $comment_row['commentDate'];
    ?>
    <figure class="comment-pic">
        <img src="<?=$profile_path?>">
    </figure>
    <h4><?=$comment_write_username?></h4>
    <p class="comment-time"><span class="comment-time-counter"><?=$time?></span></p>
    <p class="comment-contents"><?=$comment_content?></p>
</div>