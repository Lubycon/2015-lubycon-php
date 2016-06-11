$(document).ready(function(){
	'use strict';

	var windowWidth = window.innerWidth-310,
	windowHeight = window.innerHeight-208;

	var bgPreset3d = backgroundPreset3d,
    varbgPreset2d = backgroundPreset2d;

	var skymapEnable = true;
	var skymapIndex = 1;

	var gl = document.getElementById("web-gl");

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 0.1, 10000);
		camera.position.x = -2;
		camera.position.y = 1;
		camera.position.z = 3;

	var cameraLight = new THREE.SpotLight(0xffffff,1);
		cameraLight.castShadow = true;
		cameraLight.receiveShadow = true;
		cameraLight.target.position.set(0, 1, -1);
		cameraLight.position.copy(camera.position);

	var renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true, antialias: true });
		renderer.setSize(windowWidth, windowHeight);
		renderer.setPixelRatio(window.devicePixelRatio*1.5);
		renderer.setClearColor(0x555555, 1);
	gl.addEventListener("webglcontextlost", function(event){
		event.preventDefault();
		alert("context is lost");
		cancelAnimationFrame(animationID);
	},false);
	gl.appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 0.5;
        controls.maxDistance = 100;

	scene.add(camera, cameraLight);

	////////////////////////////////////////////////////
	//////////////user data from json///////////////////
	////////////////////////////////////////////////////
	initSkybox(skymapIndex);

    var object = loadMesh();
    scene.add(object);

    window.addEventListener("resize", windowResizeGL, false);

    animateGL();
    ////////////////////////////////////////////////////
	//////////////user data from json///////////////////
	////////////////////////////////////////////////////

	function initSkybox(index){
        var skymapIndex = index;
        var lights = bgPreset3d[index].light;
        console.log(lights);

        var skyGeometry = new THREE.SphereGeometry(500, 60, 40);
        var skyMaterial = new THREE.MeshBasicMaterial({
            map : new THREE.TextureLoader().load(bgPreset3d[index].image)
        });
            skyMaterial.side = THREE.BackSide;
        var skybox = new THREE.Mesh(skyGeometry,skyMaterial);
        skybox.index = index;
        skybox.name = "skybox";
        skybox.material.dispose();

        for(var i = 0, l = lights.length; i < l; i++){
            var newLight = initPresetLight(lights[i],i);
            scene.add(newLight);
        }

        scene.add(skybox);

        function initPresetLight(light,i){
            var type = light.type,
            newLight = null;

            switch(type){
                case "directional" : 
                    newLight = new THREE.DirectionalLight(light.color,light.intensity);
                    newLight.target.position.set(
                        light.target.x,
                        light.target.y,
                        light.target.z
                    );   
                break;
                case "spot" : 
                    newLight = new THREE.SpotLight(light.color,light.intensity);
                    newLight.angel = light.angle;
                    newLight.penumbra = light.penumbra;
                    newLight.target.position.set(
                        light.target.x,
                        light.target.y,
                        light.target.z
                    );
                break;
                case "hemisphere" : 
                    newLight = new THREE.HemisphereLight(light.skyColor,light.groundColor,light.intensity);
                break;
                case "point" : break;
                default : return false; break;
            }
            console.log(newLight);

            newLight.position.set(
                light.position.x,
                light.position.y,
                light.position.z
            );
            newLight.name = "PresetLight"+i;

            return newLight;
        }
    }

    function animateGL(){
    	controls.update();
    	requestAnimationFrame(animateGL);
	    renderGL();
    }

    function renderGL(){
    	renderer.render(scene, camera);
    	cameraLight.position.copy(camera.position);
    }

    function windowResizeGL(){
    	windowWidth = window.innerWidth-310,
		windowHeight = window.innerHeight-208;

    	camera.aspect = windowWidth / windowHeight;
    	camera.updateProjectionMatrix();
    	renderer.setSize(windowWidth, windowHeight);
    }

    function loadMesh(){
    	var geometry = new THREE.BoxGeometry(1,1,1);
    	var material = new THREE.MeshPhongMaterial({ color: 0x888888 });
    	var mesh = new THREE.Mesh(geometry,material);

    	return mesh;
    }
});


