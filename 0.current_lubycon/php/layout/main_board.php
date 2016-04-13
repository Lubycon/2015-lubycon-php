<section id="main_board">
    <?php

        $conn = mysqli_connect("localhost", "lubycon", "hmdwdgdhkr2015", "lubycon");
        
        switch($_GET['cate']){
        case 'forum' : $contents_cate = 1; break;
        case 'tutorial' : $contents_cate = 2;  break;
        case 'qna' : $contents_cate = 3;  break;
        default : $contents_cate = 3;  break;
        };


        $query = "SELECT * FROM `luby_board` WHERE `contents_code` = " .$contents_cate. " ORDER BY `luby_board`.`board_code` DESC ";
        $result = mysqli_query($conn,$query);
    ?>
    <div class="table_wrap">
        <div class="table_head">
            <div class="board_name">
                <?php
                    switch($_GET['cate']){
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
                $query_name = "SELECT * FROM `luby_user` WHERE `user_code` =" . $row['user_code'];
                $result_name = mysqli_query($conn,$query_name);
                $row_name = mysqli_fetch_array($result_name);

                include('../layout/community_card.php');
            }
            ?>
            </ul>
        </div>
    </div>
</section>