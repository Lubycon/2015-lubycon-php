<figure id="main_figure">
    <h2>FOLLOWERS</h2>
</figure>
<!-- end main_figure -->

<link href="css/followers.css" rel="stylesheet" type="text/css" />
<!-- personal page css -->


<section id="contents">
    <?php
    include_once("php/layout/personal_layout.php");
    include_once("php/layout/user_inform.php");
    ?>
    <!-- end contents box -->
    <div id="follower_bar">
        <article id="follower_count">
            <span id="follower_num">20</span>
            <span id="follower_text">followers</span>
        </article>
    </div>
        <section id="followers_box">
        	<ul>
                <?php
                for($i=0;$i<20;$i++)
                {
                    include('php/layout/follower_card.php');
                }
                ?>
            </ul>
        </section><!--end follower box-->
</section>
<!-- end contents section -->

