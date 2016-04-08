$(window).on("load",function(){
	"use strict";
	var funcs = {
		windowResize: function(){
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth,window.innerHeight);
		},
		objLength: function(){
			var $this = $(this),
			data = $this.data("value"),
			$target = cubeMesh,
			objX = $target.scale.x,
			objY = $target.scale.y,
			objZ = $target.scale.z;
			if($this.hasClass("selected")){
				$this.removeClass("selected");
				switch(data){
					case "x" : $target.scale.set(objX*0.5,objY,objZ); break;
					case "y" : $target.scale.set(objX,objY*0.5,objZ); break;
					case "z" : $target.scale.set(objX,objY,objZ*0.5); break;
					default : return false; break;
				}
			}
			else if(!$this.hasClass("selected")) {
				$this.addClass("selected");
				switch(data){
					case "x" : $target.scale.set(objX*2,objY,objZ); break;
					case "y" : $target.scale.set(objX,objY*2,objZ); break;
					case "z" : $target.scale.set(objX,objY,objZ*2); break;
					default : return false; break;
				}
			}
		},
		animate: function(){
			var $this = $(this);
			if($this.hasClass("selected")){
				$this.removeClass("selected");
				$this.html("Stop Animation");
				defaultSpeed = 0.01;
			}
			else if(!$this.hasClass("selected")){
				$this.addClass("selected");
				$this.html("Start Animation");
				defaultSpeed = 0;
			}
		},
		imgUpload: function(event){
			var $object = event.target.files;

			$.each($object, function(i,file){
	            var reader = new FileReader();
	            reader.readAsDataURL(file);
	            reader.onload = function(event){
	       			var material = new THREE.MeshLambertMaterial({
	       				map: THREE.ImageUtils.loadTexture(event.target.result)
	       			});
	       			cubeMesh.material = material;
	            };
	        });
		},
		click: function(){
			console.log(true);
		},
		updateFPS: function(){
			stats.begin();
			stats.end();
		},
		changeTool: function(event){
			var keyCode = event.keyCode;
			switch(event.keyCode){
				case 81: // Q
					transformControls.setSpace(transformControls.space === "local" ? "world" : "local");
				break;
				case 87: // W
					transformControls.setMode("translate");
				break;
				case 69: // E
					transformControls.setMode("rotate");
				break;
				case 82: // R
					transformControls.setMode("scale");
				break;
				case 187:
					transformControls.setSize(transformControls.size + 0.1);
				break;
				case 189:
					transformControls.setSize( Math.max( transformControls.size - 0.1, 0.1 ) );
				break;
			}
		}
	},
	params = {
		objColor: {
			mint: "0x48cfad",
			white: "0xffffff",
			blue: "0x488ccb",
			red: "0xec6446",
			orange: "0xffbe54"
		},
		control: {
			shadow: true,
			exposure: 0.68
		}
	};

	window.addEventListener("resize", funcs.windowResize, false);
	window.addEventListener("keydown", funcs.changeTool);

	var scene = new THREE.Scene();
		scene.add( new THREE.GridHelper(20, 3));
		//THREE.WebGLRenderer: OES_texture_float_linear extension not supported
	var renderer = new THREE.WebGLRenderer();
		renderer.physicallyCorrectLights = true;
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setClearColor(0x282828,1);
		renderer.sortObjects = false;
	var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000); //camera
		camera.position.z = 5;
		camera.position.y = 0;
	var sLight = new THREE.SpotLight(0xffffff,0.5); //spot light
		sLight.position.set(1,5,0);
		sLight.castShadow = true;
		sLight.shadowCameraVisible = true;
		sLight.shadowDarkness = 0.5;
		sLight.shadowMapWidth = 1;
		sLight.shadowMapHeight = 1;
		sLight.shadowCameraNear = 1;
		sLight.shadowCameraFar = 7;
		sLight.shadowCameraFov = 20;
	var sLightHelper = new THREE.SpotLightHelper(sLight);
	var aLight = new THREE.AmbientLight(0xffffff, 1); //ambient light
		aLight.position.set(-1,-3,0);
		aLight.shadowCameraVisible = true;
		aLight.shadowDarkness = 0.2;
		aLight.shadowMapWidth = 1;
		aLight.shadowMapHeight = 1;
		aLight.shadowCameraNear = 1;
		aLight.shadowCameraFar = 100;
		aLight.shadowCameraFov = 25;
	var viewControls = new THREE.OrbitControls(camera);
	
	var stats = new Stats();
		stats.setMode(0);
		stats.domElement.style.position = "absolute";
		stats.domElement.style.left = "10px";
		stats.domElement.style.top = "10px";
		document.body.appendChild(stats.domElement);
	var gui = new dat.GUI();
		gui.add(params.control, "shadow");
		gui.add(params.control, "exposure", 0, 1);
		gui.domElement.style.position = "absolute";
		gui.domElement.style.right = "0px";
		gui.domElement.style.top = "10px";
		gui.open();
	var _$ = new THREEx.DomEvents(camera, renderer.domElement);

	var cube = new THREE.BoxGeometry(1,1,1);
	var cubeMate = new THREE.MeshPhongMaterial({
		ambient: 0x48cfad,
		color: 0x48cfad,
		specular: 0xffffff,
		shininess: 50,
		shading: THREE.SmoothShading
	});
	var cubeMesh = new THREE.Mesh(cube,cubeMate);
	var wireframe = new THREE.WireframeHelper(cubeMesh,0xffffff);

	var plane = new THREE.PlaneGeometry(20,20,1,1);
	var planeMate = new THREE.MeshPhongMaterial({
		color: 0x222222
	});
	var planeMesh = new THREE.Mesh(plane, planeMate);
		planeMesh.position.y = -1;
		planeMesh.receiveShadow = true;
		planeMesh.rotation.x = -Math.PI/2;
	var animate,update;

	$("body").append(renderer.domElement);
	
	scene.add(cubeMesh,wireframe,planeMesh,sLight,sLightHelper,aLight);

	var requestAni,update;
	var defaultSpeed = 0.01;
	var prevShadowMap = false;
	function render(){
		update = requestAnimationFrame(funcs.updateFPS);
		renderer.render(scene,camera);
	}
	function animate(){
		requestAni = requestAnimationFrame( animate );
		cubeMesh.rotation.y += defaultSpeed;
		renderer.toneMappingExposure = Math.pow(params.control.exposure,5.0);
		renderer.shadowMapEnabled = params.control.shadow;
		cubeMesh.needsUpdate = true;
		planeMesh.needsUpdate = true;
		prevShadowMap = true;
		render();
	}
	animate();


	//jquery events
	$("canvas").attr("id","webgl");
	var btwrap = $("<div/>",{
		"class" : "testBtWrap"
	}).appendTo("body");

	var cubeBtX = $("<button/>",{
		"class" : "testBt",
		"html" : "Scale-X",
		"data-value" : "x"
	}).on("click",funcs.objLength).appendTo(btwrap);
	var cubeBtY = $("<button/>",{
		"class" : "testBt",
		"html" : "Scale-Y",
		"data-value" : "y"
	}).on("click",funcs.objLength).appendTo(btwrap);
	var cubeBtZ = $("<button/>",{
		"class" : "testBt",
		"html" : "Scale-Z",
		"data-value" : "z"
	}).on("click",funcs.objLength).appendTo(btwrap);
	var aniBt = $("<button/>",{
		"class" : "testBt",
		"html" : "Stop Animation",
	}).on("click",funcs.animate).appendTo(btwrap);
	$("#imgInput").on("change",funcs.imgUpload);
	_$.addEventListener(cubeMesh,"mouseover",function(){
		var color = new THREE.Color(0xffbe54);
		cubeMesh.material.color = color;
		//console.log(cubeMesh.material.color.getHexString())
	},false);
	_$.addEventListener(cubeMesh,"mouseout",function(){
		var color = new THREE.Color(0x48cfad);
		cubeMesh.material.color = color;
		//console.log(cubeMesh.material.color.getHexString());
	},false);
});