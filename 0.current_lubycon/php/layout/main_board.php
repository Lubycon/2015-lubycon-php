<section id="main_board">
    <?php

        $conn = mysqli_connect("localhost", "lubycon", "hmdwdgdhkr2015", "lubycon");
        
        switch($_GET[3]){
        case 'forum' : $contents_cate = 1; break;
        case 'tutorial' : $contents_cate = 2;  break;
        case 'qna' : $contents_cate = 3;  break;
        default : $contents_cate = die('no category');  break;
        };


        $query = "SELECT * FROM `luby_board` WHERE `contents_code` = " .$contents_cate. " ORDER BY `luby_board`.`board_code` ASC ";
        $result = mysqli_query($conn,$query);


        @$third_param = $_GET["3"];
        @$current_url = $third_param;
    ?>
    <div class="table_wrap">
        <div class="table_head">
            <div class="board_name">
                <?php
                    switch($current_url){
                        case "forum" : echo "Forum"; break;
                        case "tutorial" : echo "Tutorial"; break;
                        case "qna" : echo "Q & A"; break;
                        default : echo "All"; break;
                    }
                ?>
            </div>
            <div class="table_head_wrap">                              
                <span class="table_date hidden-mb-ib">Date</span>
                <span class="table_view hidden-mb-ib"><i class="fa fa-eye"></i></span> <!-- eye icon -->
                <span class="table_like hidden-mb-ib"><i class="fa fa-heart"></i></span>    <!-- heart icon -->
            </div>
        </div>
        <div class="table_body">
            
            <ul class="table_list_wrap">
            <?php
            while( $row = mysqli_fetch_array($result) )
            {
                @$third_param = $_GET['3'];
                $third_param = $third_param;

                @include('./php/layout/community_card.php');
                @include('../layout/community_card.php');
            }
            ?>
            </ul>
        </div>
    </div>
</section>