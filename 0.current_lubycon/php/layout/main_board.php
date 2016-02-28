<section id="main_board">
    <?php
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
            $j = 1;
            for($i=0;$i<30;$i++){
                @$third_param = $_GET['3'];
                $third_param = $third_param;
                $_GET["number"] = $j;
                @include('./php/layout/community_card.php');
                @include('../layout/community_card.php');
                $j++;
            }
            ?>
            </ul>
        </div>
    </div>
</section>