$(document).ready(function(){
	'use strict';

	var windowWidth = window.innerWidth-310,
	windowHeight = window.innerHeight-208;

	var gl = document.getElementById("web-gl");

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 0.1, 10000);
		camera.position.x = -2;
		camera.position.y = 1;
		camera.position.z = 3;

	var ambLight = new THREE.AmbientLight(0xffffff,1);




	////////////////////////////////////////////////////
	//////////////user data from json///////////////////
	////////////////////////////////////////////////////
	var spotLight = new THREE.SpotLight(0xffffff,1);
		spotLight.castShadow = true;
		spotLight.receiveShadow = true;

	scene.add(camera, spotLight, ambLight);
	spotLight.target.position.set(0, 1, -1);
	spotLight.position.copy(camera.position);

	var skyGeometry = new THREE.SphereGeometry(500, 60, 40);
	var skyMaterial = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load("../editor/img/3dBackgrounds/room_blur.jpg")
	});
		skyMaterial.side = THREE.BackSide;
	var skybox = new THREE.Mesh(skyGeometry,skyMaterial);
	skybox.material.dispose();

	scene.add(skybox);

	var renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true });
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

    var object = loadMesh();
    scene.add(object);

    //window.addEventListener("resize", windowResizeGL, false);

    animateGL();
    ////////////////////////////////////////////////////
	//////////////user data from json///////////////////
	////////////////////////////////////////////////////






    function animateGL(){
    	controls.update();
    	requestAnimationFrame(animateGL);
	    renderGL();
    }

    function renderGL(){
    	renderer.render(scene, camera);
    	spotLight.position.copy(camera.position);
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


