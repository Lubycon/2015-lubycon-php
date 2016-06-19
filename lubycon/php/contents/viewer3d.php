<!--test file-->
<?php
    $skymapJSON = file_get_contents($file_path."json/map.json");
    $lightJSON = file_get_contents($file_path."json/lights.json");
    $modelJSON = file_get_contents($file_path."json/model.json");
    echo "<script>var skymapJSON = $skymapJSON; var lightJSON = $lightJSON; var modelJSON = $modelJSON; </script>";
	$path = "../editor/module/js/3d/";
?>
<script>var PRESET_DEPTH = "../../"</script>

<script type="text/javascript" src="../../data/webGLmap_Preset/backgroundPreset3d.json"></script>
<script type="text/javascript" src="../../data/webGLmap_Preset/backgroundPreset2d.json"></script>
<script src="<?=$path?>three.js"></script>
<script src="<?=$path?>OrbitControls.js"></script>
<script src="<?=$path?>3dLoader.js"></script>
<script src="./viewer3d.js"></script>
<style>
	#web-gl {
		width: 95%;
		height: 90%;
		margin: 0px auto;
	}
		#web-gl > canvas {
			width: 100% !important;
		}
</style>
<div id="web-gl"></div>
<!--test file-->