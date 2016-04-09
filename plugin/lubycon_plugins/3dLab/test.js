$(window).on("load",function(){
	"use strict";

	var scene, camera, dirLight, ambLight, renderer, controls, stats;
	var object;
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
				case "objInput" : target.off("change").on("change",funcs.uploadObj); break;
				case "texInput" : target.off("change").on("change",funcs.uploadTex); break;
				default : $.error("Can't find input element : " + target); break;
			}
			target.trigger("click");
		},
		uploadObj: function(event){
			var $input = $(this),
			$object = event.target.files;
			funcs.loaders($object[0]);
			console.log("uploadObj");
		},
		uploadTex: function(event){
			console.log("a");
			var input = $(this);
			var $texture = event.target.files;
			$.each($texture,function(i,file){
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(event){
					var material = new THREE.MeshPhongMaterial({
	       				map: THREE.ImageUtils.loadTexture(event.target.result)
	       			});
	       			object.children[0].material = material;
				}
			});
		},
		loaders: function(file){
			var reader = new FileReader();
			var filename = file.name;
			var ext = filename.split(".")[1];
			console.log(ext);
			switch(ext){
				case "obj" :
					reader.addEventListener("load", function (event) {
						var contents = event.target.result;
						object = new THREE.OBJLoader().parse(contents);
						object.name = filename;
						object.children[0].geometry.center();
						object.children[0].material.color = new THREE.Color(0x888888);
						object.children[0].material.specular = new THREE.Color(0xffffff);
						object.children[0].material.shininess = 100;
						object.children[0].material.shading = THREE.SmoothShading;
						scene.add(object);
						console.log(object.children[0].material);
					},false);
					reader.readAsText(file);
				break;
				case "fbx" :
					reader.addEventListener("load", function(event){
						var contents = event.target.result;
						var object = new THREE.FBXLoader().parse(contents);
						object.name = filename;
						object.children[0].geometry.center();
						object.children[0].material.color = new THREE.Color(0x888888);
						scene.add(object);
					},false);
					reader.readAsText(file);
				break;
				default: $.error("this is not supported file"); break;
			}
		},
		convertJson: function(file){
			console.log("converted to json");
		}
	}
	initGL();
	initUI();
	
	function initGL(){
		var windowWidth = window.innerWidth,
			windowHeight = window.innerHeight;

		var gl = document.getElementById("web-gl");

		scene = new THREE.Scene();
		scene.add(new THREE.AxisHelper(50));
		scene.add(new THREE.GridHelper(50, 10));

		camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 0.1, 2000);
		camera.position.z = 10;

		dirLight = new THREE.DirectionalLight(0xffffff);
		dirLight.position.y = 120;
		dirLight.position.x = -100;
		var dirHelper = new THREE.DirectionalLightHelper(dirLight);
		ambLight = new THREE.AmbientLight(0xffffff);
		scene.add(dirLight,dirHelper,ambLight);

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(windowWidth, windowHeight);
		renderer.setClearColor(0x222222, 1);
		gl.appendChild(renderer.domElement);

		controls = new THREE.TrackballControls(camera);

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
		stats.update();
		controls.update();
		requestAnimationFrame(animate);
		render();
	}
	function render(){
		renderer.render(scene, camera);
	}
});