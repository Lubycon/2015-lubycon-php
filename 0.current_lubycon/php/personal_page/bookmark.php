<ul>
    <?php
        for($i=0;$i<60;$i++)
        {
            $_GET["number"] = $i;
            $category_param = 'my_contents';

            $one_depth = '../contents';
            $web_depth = '../..';
            include('../layout/content_card.php');
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
