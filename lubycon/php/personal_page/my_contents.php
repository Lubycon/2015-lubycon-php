<script>var PRESET_DEPTH = "../../"</script>

<link type="text/css" href="../../css/module/chosen.css" rel="stylesheet" />
<link type="text/css" href="../../css/module/modifyWindow.css" rel="stylesheet" />
<script type="text/javascript" src="../../js/module/modalClass.js"></script>
<script type="text/javascript" src="../../js/module/chosen.jquery.js"></script>
<script type="text/javascript" src="../../data/module/keyCode.json"></script>
<script type="text/javascript" src="../../data/creative_commons.json"></script>
<script type="text/javascript" src="../../js/my_contents.js"></script>
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
