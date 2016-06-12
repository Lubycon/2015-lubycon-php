<?php
    //if(isset($_COOKIE)){
    //    if(isset($_COOKIE['login'])){
    //    }else if(!isset($_COOKIE['login'])){
    //        echo('<script>location.href="login_page.php"</script>');
    //    }
    //}
    $one_depth = '../../../..'; //css js load
    $two_depth = '../../..'; // php load
    $preset_depth = '../../../../';
    include_once('../../../layout/index_header.php');
?>
<script>var PRESET_DEPTH = '<?= $preset_depth ?>'</script>

<link href="../../../../css/module/lubySlider.css" rel="stylesheet" type="text/css" />
<link href="../../module/css/spectrum.css" rel="stylesheet" type="text/css" />
<link href="../../module/css/cropper.css" rel="stylesheet" type="text/css" />
<link href="../../module/css/chosen.css" rel="stylesheet" type="text/css" />
<link href="./editor3d.css" rel="stylesheet" type="text/css" />
<link href="../../../../css/editor.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="../../data/icons.json"></script>
<script type="text/javascript" src="../../data/keyCode.json"></script>
<script type="text/javascript" src="../../data/categories.json"></script>
<script type="text/javascript" src="../../data/creative_commons.json"></script>
<script type="text/javascript" src="<?=$preset_depth?>data/webGLmap_Preset/backgroundPreset3d.json"></script>
<script type="text/javascript" src="<?=$preset_depth?>data/webGLmap_Preset/backgroundPreset2d.json"></script>

<script type="text/javascript" src="../../../../js/module/jquery.lubySlider.js"></script>
<script type="text/javascript" src="../../module/js/modalClass.js"></script>
<script type="text/javascript" src="../../module/js/spectrum.js"></script>
<script type="text/javascript" src="../../module/js/cropper.js"></script>
<script type="text/javascript" src="../../module/js/chosen.jquery.js"></script>
<script type="text/javascript" src="../../module/js/html2canvas.js"></script>
<script type="text/javascript" src="../../module/js/resizeObject.js"></script>

<script type="text/javascript" src="../../module/js/3d/three.js"></script>

<script type="text/javascript" src="../../module/js/3d/3dLoader.js"></script>
<script type="text/javascript" src="../../module/js/3d/TGALoader.js"></script>
<script type="text/javascript" src="../../module/js/3d/ShadowMaterial.js"></script>
<script type="text/javascript" src="../../module/js/3d/OrbitControls.js"></script>
<script type="text/javascript" src="../../module/js/3d/TransformControls.js"></script>
<script type="text/javascript" src="../../module/js/3d/threex.domevents.js"></script>
<script type="text/javascript" src="../../module/js/editorClasses.js"></script>
<script type="text/javascript" src="./editor3d.js"></script> 

<!-- editor css -->
<section id="editor-container" class="initEditor"></section>
<?php
//php variable setting
    $contents_cate = $_GET["cate"];

    $allow_array = ['threed'];

    if( in_array($contents_cate , $allow_array) ){
        echo 
        '<script>
	        $("#editor-container").initEditor();
        </script>';
    }else
    {
        include_once('../../404.php');
    }
?>
<?php
    include_once($two_depth.'/layout/index_footer.php');
?>