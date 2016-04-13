<?php
    //if(isset($_COOKIE)){
    //    if(isset($_COOKIE['login'])){
    //    }else if(!isset($_COOKIE['login'])){
    //        echo('<script>location.href="login_page.php"</script>');
    //    }
    //}
    $one_depth = '../..'; //css js load
    $two_depth = '..'; // php load
    include_once('../layout/index_header.php');
?>
<link href="./css/lubySlider.css" rel="stylesheet" type="text/css" />
<link href="./css/spectrum.css" rel="stylesheet" type="text/css" />
<link href="./css/cropper.css" rel="stylesheet" type="text/css" />
<link href="./css/chosen.css" rel="stylesheet" type="text/css" />
<link href="./css/lubyPictool.css" rel="stylesheet" type="text/css" />
<link href="../../css/editor.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="./js/jquery.lubySlider.js"></script>
<script type="text/javascript" src="./js/spectrum.js"></script>
<script type="text/javascript" src="./js/cropper.js"></script>
<script type="text/javascript" src="./js/chosen.jquery.js"></script>
<script type="text/javascript" src="./js/html2canvas.js"></script>
<script type="text/javascript" src="./js/resizeObject.js"></script>
<script type="text/javascript" src="./jquery.lubyPictool.js"></script> 

<!-- editor css -->

<?php
//php variable setting
    $contents_cate = $_GET["cate"];
?>
<section id="editor-container" class="lubyPictoolKey"></section>
<script>
	$("#editor-container").lubyPictool({
		submit: function(data){
			//console.log(data);
		}
	});
</script>
<?php
    include_once($two_depth.'/layout/index_footer.php');
?>