<?php
    //if(isset($_COOKIE)){
    //    if(isset($_COOKIE['login'])){
    //    }else if(!isset($_COOKIE['login'])){
    //        echo('<script>location.href="login_page.php"</script>');
    //    }
    //}
    $one_depth = '../../..'; //css js load
    $two_depth = '../..'; // php load
    include_once('../../../layout/index_header.php');
?>
<link href="../../module/css/lubySlider.css" rel="stylesheet" type="text/css" />
<link href="../../module/css/spectrum.css" rel="stylesheet" type="text/css" />
<link href="../../module/css/cropper.css" rel="stylesheet" type="text/css" />
<link href="../../module/css/chosen.css" rel="stylesheet" type="text/css" />
<link href="../../module/css/lubyPictool.css" rel="stylesheet" type="text/css" />
<link href="./editor.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="../../module/js/jquery.lubySlider.js"></script>
<script type="text/javascript" src="../../module/js/spectrum.js"></script>
<script type="text/javascript" src="../../module/js/cropper.js"></script>
<script type="text/javascript" src="../../module/js/chosen.jquery.js"></script>
<script type="text/javascript" src="../../module/js/html2canvas.js"></script>
<script type="text/javascript" src="../../module/js/resizeObject.js"></script>
<script type="text/javascript" src="./jquery.lubyPictool.js"></script> 

<!-- editor css -->
<section id="editor-container" class="lubyPictoolKey"></section>
<?php
//php variable setting
    $contents_cate = $_GET["cate"];

    $allow_array = ['artwork','vector','3d'];

    if( in_array($contents_cate , $allow_array) )
    {
        echo 
        '<script>
	        $("#editor-container").lubyPictool({
		        submit: function(data){
			        //console.log(data);
		        }
	        });
        </script>';
    }else
    {
        include_once('../../404.php');
    }
?>
<?php
    include_once($two_depth.'/layout/index_footer.php');
?>