
<link href="../plugin/JS/lubySlider.css" rel="stylesheet" type="text/css" />
<link href="../plugin/JS/spectrum.css" rel="stylesheet" type="text/css" />
<link href="../plugin/JS/cropper.css" rel="stylesheet" type="text/css" />
<link href="../plugin/JS/chosen.css" rel="stylesheet" type="text/css" />
<link href="./pages/view/editor/editor.css" rel="stylesheet" type="text/css" />
<link href="./pages/view/editor/3d/3d.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="../data/module/icons.json"></script>
<script type="text/javascript" src="../data/module/keyCode.json"></script>
<script type="text/javascript" src="../data/categories.json"></script>
<script type="text/javascript" src="../data/creative_commons.json"></script>
<script type="text/javascript" src="../data/webGLmap_Preset/backgroundPreset3d.json"></script>
<script type="text/javascript" src="../data/webGLmap_Preset/backgroundPreset2d.json"></script>

<script type="text/javascript" src="../plugin/JS/modalClass.js"></script>
<script type="text/javascript" src="../plugin/JS/spectrum.js"></script>
<script type="text/javascript" src="../plugin/JS/cropper.min.js"></script>
<script type="text/javascript" src="../plugin/JS/chosen.jquery.js"></script>
<script type="text/javascript" src="../plugin/JS/html2canvas.js"></script>

<script type="text/javascript" src="./pages/controller/editor/three.js"></script>

<script type="text/javascript" src="./pages/controller/editor/3dLoader.js"></script>
<script type="text/javascript" src="./pages/controller/editor/TGALoader.js"></script>
<script type="text/javascript" src="./pages/controller/editor/ShadowMaterial.js"></script>
<script type="text/javascript" src="./pages/controller/editor/OrbitControls.js"></script>
<script type="text/javascript" src="./pages/controller/editor/TransformControls.js"></script>
<script type="text/javascript" src="./pages/controller/editor/threex.domevents.js"></script>
<script type="text/javascript" src="./pages/controller/editor/editorClasses.js"></script>
<script type="text/javascript" src="./pages/view/editor/3d/3d.js"></script> 

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
    }else{
        include_once('./service/view/error/404.php');
    }
?>