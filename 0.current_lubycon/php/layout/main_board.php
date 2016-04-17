<section id="main_board">
    <?php
        $conn = mysqli_connect("localhost", "lubycon", "hmdwdgdhkr2015", "lubyconboard");
        
        switch($_GET['cate']){
        case 'forum' : $contents_cate = 1; $cate_name = 'forum'; break;
        case 'tutorial' : $contents_cate = 2; $cate_name = 'tutorial'; break;
        case 'qna' : $contents_cate = 3; $cate_name = 'qna'; break;
        default : $contents_cate = 1;  break;
        };

        $query = "SELECT * FROM `".$cate_name."` ORDER BY `".$cate_name."`.`boardCode` DESC";
        $result = mysqli_query($conn,$query);
        $row = mysqli_fetch_array($result);
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

            if( is_array($row) )
            {
                while( $row = mysqli_fetch_array($result) )
                {
                    //$query_name = "SELECT * FROM `lubyconuser` WHERE `userCode` =" . $row['userCode'];
                    //$result_name = mysqli_query($conn,$query_name);
                    //$row_name = mysqli_fetch_array($result_name);

                    include('../layout/community_card.php');
                }
            }else
            {
                echo 'nothing in database';
            }
            ?>
            </ul>
        </div>
    </div>
</section>