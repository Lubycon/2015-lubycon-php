$(document).ready(function(){
	'use strict';

	var windowWidth = window.innerWidth-310,
	windowHeight = window.innerHeight-310;

	var bgPreset3d = backgroundPreset3d,
    varbgPreset2d = backgroundPreset2d;

	var gl = document.getElementById("web-gl");

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 0.1, 10000);
		camera.position.x = -2;
		camera.position.y = 1;
		camera.position.z = 3;

	var cameraLight = new THREE.SpotLight(0xffffff,0.1);
		cameraLight.castShadow = true;
		cameraLight.receiveShadow = true;
		cameraLight.target.position.set(0, 1, -1);
		cameraLight.position.copy(camera.position);

	var renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true, antialias: true });
		renderer.setSize(windowWidth, windowHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x222222, 1);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
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
    window.addEventListener("resize", windowResizeGL, false);
    animateGL();
    loadUserData();
    //skymapJSON, lightJSON, modelJSON
	

    function loadUserData(){
        initSkybox();
        initCustomLights();
        initUserModel();
    }

	function initSkybox(){
        var enable3D = skymapJSON.threed,
        skymapIndex = skymapJSON.skymap,
        image2D = skymapJSON.image,
        backgroundColor = skymapJSON.color;

        var lights = bgPreset3d[skymapIndex].light;
        console.log(lights);

        var skyGeometry = new THREE.SphereGeometry(500, 60, 40);
        var skyMaterial = new THREE.MeshBasicMaterial({
            map : new THREE.TextureLoader().load(bgPreset3d[skymapIndex].image)
        });
            skyMaterial.side = THREE.BackSide;
        var skybox = new THREE.Mesh(skyGeometry,skyMaterial);
        skybox.index = skymapIndex;
        skybox.name = "skybox";
        skybox.material.dispose();

        for(var i = 0, l = lights.length; i < l; i++){
            var newLight = unpackLight(lights[i],i);
            console.log(newLight);
            scene.add(newLight);
        }

        scene.add(skybox);
    }

    function initCustomLights(){
        console.log(lightJSON);
        for(var i = 0, l = lightJSON.length; i < l; i++){
            var newLight = unpackLight(lightJSON[i],i);
            console.log(newLight)
            scene.add(newLight);
        }
    }

    function unpackLight(light,i){
        console.log(light);
        var type = light.type,
        newLight = null;
        console.log(light.color);

        switch(type){
            case "DirectionalLight" : 
                newLight = new THREE.DirectionalLight(light.color,light.intensity);
                newLight.target.position.set(
                    light.target.x,
                    light.target.y,
                    light.target.z
                );   
            break;
            case "SpotLight" : 
                newLight = new THREE.SpotLight(light.color,light.intensity);
                newLight.angel = light.angle;
                newLight.penumbra = light.penumbra;
                newLight.target.position.set(
                    light.target.x,
                    light.target.y,
                    light.target.z
                );
            break;
            case "HemisphereLight" : 
                newLight = new THREE.HemisphereLight(light.skyColor,light.groundColor,light.intensity);
            break;
            case "PointLight" : 
                newLight = new THREE.PointLight(light.color,light.intensity,light.radius);
            break;
            default : return false; break;
        }

        newLight.position.set(
            light.position.x,
            light.position.y,
            light.position.z
        );
        newLight.castShadow = light.castShadow;
        newLight.receiveShadow = true;
        newLight.name = light.name;
        console.log(newLight.color.getHex());

        return newLight;
    }

    function initUserModel(){
        var loader = new THREE.ObjectLoader().parse(modelJSON);
        loader.remove(loader.children[1]);
        scene.add(loader);
        console.log(loader);
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
});


