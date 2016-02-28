<ul>
    <?php
        for($i=0;$i<60;$i++)
        {
            $_GET["number"] = $i;
            include('../layout/content_card.php');
        }
    ?>
</ul>
<!-- tempelate script -->
<script>
    $(document).ready(function()
    {
        $(".lubyAlert_bt").css("color","#FFBE54");
    });
</script>
<!-- tempelate script -->
