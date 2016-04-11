$(window).on("load",function(){
	"use strict";

	var scene, camera, dirLight, ambLight, renderer, controls, stats;
	var object, mtl;
	var funcs = {
		windowResize: function(){
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		},
		btnTrigger: function(){
			var data = $(this).data("value"),
			target = $(this).data("target"),
			input = $("#"+target),
			inputInit = input.removeClass();
			switch(target){
				case "objInput" : input.off("change").on("change",funcs.uploadObj); break;
				case "texInput" : 
					input.addClass(data); 
					input.off("change").on("change",funcs.uploadTex);
				break;
				default : $.error("Can't find input element : " + target); break;
			}
			input.trigger("click");
		},
		uploadObj: function(event){
			var $input = $(this),
			$object = event.target.files;
			funcs.loaders($object[0]);
		},
		uploadTex: function(event){
			var $input = $(this);
			var $texture = event.target.files;
			var type = $input.attr("class");
			var material;
			$.each($texture,function(i,file){
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(event){
					switch(type){
						case "diffuse" :
			       			object.children[0].material.map = THREE.ImageUtils.loadTexture(event.target.result);
			       			object.children[0].material.needsUpdate = true;
		       			break;
		       			case "specular" :
		       				object.children[0].material.specularMap = THREE.ImageUtils.loadTexture(event.target.result);
		       				object.children[0].material.needsUpdate = true;
	       				break;
	       				case "normal" : 
	       					object.children[0].material.normalMap = THREE.ImageUtils.loadTexture(event.target.result);
       						object.children[0].material.needsUpdate = true;
   						break;
	       				default: $.error("Texture load error"); break;
					}
					$input.removeClass();
					$input.val(null);
				}
			});
		},
		loaders: function(file){
			var reader = new FileReader();
			var filename = file.name;
			var ext = filename.split(".").pop().toLowerCase();
			console.log(ext);
			switch(ext){
				case "obj" :
					reader.addEventListener("load", function (event) {
						var contents = event.target.result;
						object = new THREE.OBJLoader().parse(contents);
						object.traverse(function(child){
							if(child instanceof THREE.Mesh) object.toJSON();
							console.log(child);
						});
						object.name = filename;
						object.castShadow = true;
						object.receiveShadow = true;
						object.children[0].geometry.center();
						object.children[0].material.color = new THREE.Color(0x888888);
						object.children[0].material.specular = new THREE.Color(0xffffff);
						object.children[0].material.shininess = 100;
						object.children[0].material.shading = THREE.SmoothShading;
						object.children[0].material.side = THREE.DoubleSide;
						scene.add(object);
					},false);
					reader.readAsText(file);
				break;
				case "fbx" :
					reader.addEventListener("load", function(event){
						var contents = event.target.result;
						object = new THREE.FBXLoader().parse(contents);
						console.log(object);
						var toJSON = object.toJSON();
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
		completeLoad: function(){
			console.log("load complete");
		},
		onProgress: function(xhr){
			console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
		},
		onError: function(xhr){
			$.error("load Error");
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
		scene.add(new THREE.GridHelper(3, 0.5));

		camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 0.1, 2000);
		camera.position.z = 10;

		dirLight = new THREE.DirectionalLight(0xffffff);
		dirLight.position.y = 100;
		dirLight.position.x = -100;
		var dirHelper = new THREE.DirectionalLightHelper(dirLight);
		ambLight = new THREE.AmbientLight(0xffffff);
		scene.add(dirLight,dirHelper,ambLight);

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		//renderer.setPixelRatio(window.devicePixelRatio*2);
		renderer.setSize(windowWidth, windowHeight);
		renderer.setClearColor(0x222222, 1);
		gl.appendChild(renderer.domElement);

		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.15;
		controls.rotateSpeed = 0.5;
		controls.zoomSpeed = 0.5;

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
		objUpload = $("<button/>",{
			"class":"gl-btn",
			"html":"Upload Object",
			"data-target":"objInput",
			"data-value":"object"
		}).appendTo(btWrap).on("click",funcs.btnTrigger),
		diffuseUpload = $("<button/>",{
			"class":"gl-btn",
			"html":"Diffuse",
			"data-target":"texInput",
			"data-value":"diffuse"
		}).appendTo(btWrap).on("click",funcs.btnTrigger),
		specularUpload = $("<button/>",{
			"class":"gl-btn",
			"html":"Specular",
			"data-target":"texInput",
			"data-value":"specular"
		}).appendTo(btWrap).on("click",funcs.btnTrigger),
		normalUpload = $("<button/>",{
			"class":"gl-btn",
			"html":"Normal",
			"data-target":"texInput",
			"data-value":"normal"
		}).appendTo(btWrap).on("click",funcs.btnTrigger);
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