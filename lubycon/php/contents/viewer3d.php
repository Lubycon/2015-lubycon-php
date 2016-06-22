<!--test file-->
<?php
    $skymapJSON = file_get_contents($file_path."json/map.json");
    $lightJSON = file_get_contents($file_path."json/lights.json");
    $modelJSON = file_get_contents($file_path."json/model.json");
    echo "<script>var skymapJSON = $skymapJSON; var lightJSON = $lightJSON; var modelJSON = $modelJSON; </script>";
	$path = "../editor/module/js/3d/";
?>
<script>var PRESET_DEPTH = "../../"</script>

<link rel="stylesheet" type="text/css" href="../../css/viewer3d.css" />
<script type="text/javascript" src="../../data/webGLmap_Preset/backgroundPreset3d.json"></script>
<script type="text/javascript" src="../../data/webGLmap_Preset/backgroundPreset2d.json"></script>
<script type="text/javascript" src="<?=$path?>three.js"></script>
<script type="text/javascript" src="<?=$path?>OrbitControls.js"></script>
<script type="text/javascript" src="<?=$path?>3dLoader.js"></script>
<script type="text/javascript" src="../../js/viewer3d.js"></script>

<div id="web-gl">
	<div class="ui-panel top">
		<div class="ui-list" data-value='vertex'><div class="counter"></div>Vertices</div>
		<div class="ui-list" data-value='face'><div class="counter"></div>Faces</div>
	</div>
	<div class="ui-panel bottom">
		<div class="ui-list" data-value='vertex'><div class="counter"></div>WebGL Viewer</div>
		<div class="ui-list" data-value='face'><div class="counter"></div>Controller</div>
	</div>
</div>
<!--test file-->