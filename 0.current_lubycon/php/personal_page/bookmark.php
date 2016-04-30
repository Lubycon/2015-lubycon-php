<ul>
    <?php
        $allow_array = ['bookmark'];
        $cate_name = $_GET['cate'];
        if( in_array($_GET['cate'] , $allow_array) )
        {
	        require_once '../database/database_class.php';
	        $db = new Database();
            
            $query;
            $cate_name;
            $query = "SELECT * FROM `bookmark`WHERE `userCode` = 1 ";
            $db->query = $query;
		    $db->askQuery();
            
            while( $row = mysqli_fetch_array($db->result) )
            {
                include('../layout/content_card.php');
            }
        }else
        {
            include_once('../../404.php');
        }


    ?>
</ul>

<!-- tempelate script -->
<script>
$(document).ready(function(){
    $(".bookmark_bt").addClass("toggle");
})
</script>
<!-- tempelate script -->
