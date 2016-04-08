$(window).on("load",function(){
	"use strict";

	var scene, camera, dirLight, ambLight, renderer, controls, stats;
	var funcs = {
		windowResize: function(){
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		},
		btnTrigger: function(){
			var data = $(this).data("target"),
			target = $("#"+data);
			switch(data){
				case "obj-upload" : target.off("change").on("change",funcs.uploadObj); break;
				case "tex-upload" : target.off("change").on("change",funcs.uploadTex); break;
			}
			target.trigger("click");
		},
		uploadObj: function(){
			var input = $(this);
			console.log("uploadObj");
		},
		uploadTex: function(){
			var input = $(this);
			console.log("uploadTex");
		},
		detectObj: function(file){
			console.log("detectObj");
		}
	}
	initGL();
	initUI();
	
	function initGL(){
		var windowWidth = window.innerWidth,
			windowHeight = window.innerHeight;

		var gl = document.getElementById("web-gl");

		scene = new THREE.Scene();
		scene.add(new THREE.GridHelper(50, 5));

		camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 1, 2000);
		camera.position.x = -50;
		camera.position.y = 70;
		camera.position.z = 120;

		dirLight = new THREE.DirectionalLight(0xffffff);
		ambLight = new THREE.AmbientLight(0xffffff);
		scene.add(dirLight,ambLight);

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(windowWidth, windowHeight);
		renderer.setClearColor(0x222222, 1);
		gl.appendChild(renderer.domElement);

		controls = new THREE.OrbitControls(camera);

		stats = new Stats();
		stats.setMode(0);
		stats.domElement.style.position = "absolute";
		stats.domElement.style.left = "10px";
		stats.domElement.style.top = "10px";
		document.body.appendChild(stats.domElement);

		window.addEventListener("resize", funcs.windowResize, false);
		animate();
	}

	function initUI(){
		var btWrap = $("<div/>",{"class":"gl-bt-wrapper"}).appendTo("body"),
		objUpload = $("<button/>",{"class":"gl-btn","html":"Upload Object","data-target":"objInput"}).appendTo(btWrap)
		.on("click",funcs.btnTrigger),
		texUpload = $("<button/>",{"class":"gl-btn","html":"Upload Texture","data-target":"texInput"}).appendTo(btWrap)
		.on("click",funcs.btnTrigger);
	}

	function animate(){
		stats.begin();
		stats.end();
		requestAnimationFrame(animate);
		render();
	}
	function render(){
		renderer.render(scene, camera);
	}
});