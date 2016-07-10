
<link href="../plugin/JS/lubySlider.css" rel="stylesheet" type="text/css" />
<link href="../plugin/JS/spectrum.css" rel="stylesheet" type="text/css" />
<link href="../plugin/JS/cropper.css" rel="stylesheet" type="text/css" />
<link href="../plugin/JS/chosen.css" rel="stylesheet" type="text/css" />
<link href="./pages/view/editor/editor.css" rel="stylesheet" type="text/css" />
<link href="./pages/view/editor/2d/2d.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="../data/module/icons.json"></script>
<script type="text/javascript" src="../data/module/keyCode.json"></script>
<script type="text/javascript" src="../data/categories.json"></script>
<script type="text/javascript" src="../data/creative_commons.json"></script>

<script type="text/javascript" src="../plugin/JS/modalClass.js"></script>
<script type="text/javascript" src="../plugin/JS/spectrum.js"></script>
<script type="text/javascript" src="../plugin/JS/cropper.min.js"></script>
<script type="text/javascript" src="../plugin/JS/chosen.jquery.js"></script>
<script type="text/javascript" src="../plugin/JS/html2canvas.js"></script>
<script type="text/javascript" src="./pages/controller/editor/editorClasses.js"></script>
<script type="text/javascript" src="./pages/view/editor/2d/2d.js"></script> 

<!-- editor css -->
<section id="editor-container" class="initEditor"></section>
<?php 
    $cate = $_GET['cate'];
    $contents_html = '';
    $usercode = $Loginuser_code;
    $username = $Loginuser_name;
    $usercity = $Loginuser_city;
    $usercountry = $Loginuser_country;
    $userjob = $Loginuser_job;
    $user_img_url = "../../../../../../../Lubycon_Contents/user/$usercode/profile.jpg";
    $allow_array = ['all','artwork','vector','threed'];
    if( in_array($cate , $allow_array) )
    {
        switch($cate){ //check category
        case 'artwork' : $contents_cate = 1; $cate_name = 'artwork'; break;
        case 'vector' : $contents_cate = 2; $cate_name = 'vector'; break;
        default : die('top category error'); break;
        }
    }else
    {
        include_once('./service/view/error/404.php');
        die();
    };



    echo "<div id='previewer'><span id='preview-close'><i class='fa fa-reply'></i>Back to editing</span>";
        include_once("./pages/view/contents/viewer.php"); 
    echo "</div>";
?>

<?php
//php variable setting
    $contents_cate = $_GET["cate"];

    $allow_array = ['artwork','vector'];

    if( in_array($contents_cate , $allow_array) ){
        echo 
        '<script>
	        $("#editor-container").initEditor();
        </script>';
    }else{
        include_once('./service/view/error/404.php');
    }
?>