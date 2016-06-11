<!--test file-->
<?php
	$path = "../editor/module/js/3d/";
	$preset_depth = "../../";
?>
<script>var PRESET_DEPTH = '<?= $preset_depth ?>'</script>>

<script type="text/javascript" src="<?=$preset_depth?>data/webGLmap_Preset/backgroundPreset3d.json"></script>
<script type="text/javascript" src="<?=$preset_depth?>data/webGLmap_Preset/backgroundPreset2d.json"></script>
<script src="<?=$path?>three.js"></script>
<script src="<?=$path?>OrbitControls.js"></script>
<script src="<?=$path?>3dLoader.js"></script>
<script src="./viewer3d.js"></script>
<style>
	#web-gl {
		width: 90%;
		height: 90%;
		margin: 0px auto;
	}
		#web-gl > canvas {
			width: 100% !important;
		}
</style>
<div id="web-gl"></div>
<!--test file-->