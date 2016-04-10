<?php
    if(isset($_COOKIE)){
        if(isset($_COOKIE['login'])){
        }else if(!isset($_COOKIE['login'])){
            echo('<script>location.href="login_page.php"</script>');
        }
    }
?>
<link href="./php/editor/css/lubySlider.css" rel="stylesheet" type="text/css" />
<link href="./php/editor/css/spectrum.css" rel="stylesheet" type="text/css" />
<link href="./php/editor/css/cropper.css" rel="stylesheet" type="text/css" />
<link href="./php/editor/css/chosen.css" rel="stylesheet" type="text/css" />
<link href="./php/editor/css/lubyPictool.css" rel="stylesheet" type="text/css" />
<link href="css/editor.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="./php/editor/js/jquery.lubySlider.js"></script>
<script type="text/javascript" src="./php/editor/js/spectrum.js"></script>
<script type="text/javascript" src="./php/editor/js/cropper.js"></script>
<script type="text/javascript" src="./php/editor/js/chosen.jquery.js"></script>
<script type="text/javascript" src="./php/editor/js/html2canvas.js"></script>
<script type="text/javascript" src="./php/editor/js/resizeObject.js"></script>
<script type="text/javascript" src="./php/editor/jquery.lubyPictool.js"></script> 

<!-- editor css -->

<?php
//php variable setting
    $contents_cate = $_GET["3"];
?>
<section id="editor-container" class="lubyPictoolKey"></section>
<script>
	$("#editor-container").lubyPictool({
		submit: function(data){
			//console.log(data);
		}
	});
</script>
