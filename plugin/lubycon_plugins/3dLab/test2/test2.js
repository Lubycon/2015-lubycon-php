$(window).on("load",function(){
	"use strict";

	var scene, camera, dirLight, ambLight, renderer, controls, stats;
	var object, mtl, geometry, material, mesh;
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
				case "material" : funcs.materialSelect(data); break;
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
			var $input = $(this),
			$texture = event.target.files,
			type = $input.attr("class"),
			id = $("#mtlSelector").find(".mtl-option:selected").data("value"),
			materials, material;
			$.each($texture,function(i,file){
				var reader = new FileReader(),
				materials = mesh.material.materials;
				material = materials[id];
				reader.readAsDataURL(file);
				reader.onload = function(event){
					switch(type){
						case "diffuse" :
			       			material.map = THREE.ImageUtils.loadTexture(event.target.result);
			       			material.needsUpdate = true;
		       			break;
		       			case "specular" :
		       				material.specularMap = THREE.ImageUtils.loadTexture(event.target.result);
		       				material.needsUpdate = true;
	       				break;
	       				case "normal" : 
	       					material.normalMap = THREE.ImageUtils.loadTexture(event.target.result);
       						material.needsUpdate = true;
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

			switch(ext){
				case "obj" :
					reader.addEventListener("load", function (event) {
						var contents = event.target.result;
						object = new THREE.OBJLoader().parse(contents);
						geometry = object.geometry;
							geometry.center();
						material = object.material;
						var materials = object.material.materials;
							for(var i = 0, ml = materials.length; i < ml; i++){
								materials[i].specular = new THREE.Color(0xffffff);
								materials[i].specularColor = new THREE.Color(0xffffff);
								materials[i].side = THREE.DoubleSide;

								switch(i){
									case 0 : materials[i].color = new THREE.Color(0x555555); break; //Material_SCAR_DIFF.pn, BODY
									case 1 : materials[i].color = new THREE.Color(0xffc0cb); break; //Material.001_SCAR_DIF, AIM4
									case 2 : materials[i].color = new THREE.Color(0x555555); break; // Material_SCAR_DIFF.pn, BODY
									case 3 : materials[i].color = new THREE.Color(0x488ccb); break; //Material.001_SCAR_DIF, AIM2
									case 4 : materials[i].color = new THREE.Color(0x48cfad); break; //Material.002_SCAR_DIF, GLASS
									case 5 : materials[i].color = new THREE.Color(0xffaaff); break; //Material.001_SCAR_DIF, AIM1,3
								}
								materials[i].transparent = true;
								materials[i].needsUpdate = true;
							}
						mesh = new THREE.Mesh(geometry,material);
							mesh.castShadow = true;
							mesh.receiveShadow = true;
						scene.add(mesh);
						uiAddition.materialSelector(mesh);
						//scene.add(new THREE.WireframeHelper(mesh, 0x0000ff));
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
		},
		materialSelect: function(){
			var $this = $(this).find(".mtl-option:selected"),
			id = $this.data("value"),
			materials = mesh.material.materials,
			material = materials[id],
			color = material.color;
			material.color = new THREE.Color(0xffffff);
			setTimeout(function(){
				material.color = color;
			},1000);
		},
		opacityControl: function(){
			var $this = $(this),
			value = $this.val(),
			id = $("#mtlSelector").find(".mtl-option:selected").data("value"),
			materials = mesh.material.materials,
			material = materials[id];
			console.log(material);
			material.opacity = value/1000;
		}
	},
	uiAddition = {
		materialSelector: function(mesh){
			console.log("material Selector");
			var btWrap = $("<div/>",{"class":"gl-bt-wrapper bottom"}).appendTo("body"),
			selectBox = $("<select/>",{"id":"mtlSelector"}).on("change",funcs.materialSelect).appendTo(btWrap),
			options = $("<option/>",{"class":"mtl-option"}),
			addOption = function(){
				var materials = mesh.material.materials;
				for(var i = 0, l = materials.length; i < l; i++){
					var material = materials[i],
					option = options.clone();
					option.text(material.name);
					option.attr("data-value",i);
					option.appendTo(selectBox);
					if(i == 0) option.prop("selected",true);
				}
			};
			addOption();
			uiAddition.materialOpacity(mesh,btWrap);
		},
		materialOpacity: function(mesh,wrap){
			var slider = $("<input/>",{ "type":"range","id":"material-opacity","min":"0","max":"1000","value":"1000
				" })
			.on("change",funcs.opacityControl).appendTo(wrap);
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

		camera = new THREE.PerspectiveCamera(45, windowWidth/windowHeight, 0.1, 10000);
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
		gl.addEventListener("webglcontextlost",function(event){
			event.preventDefault();
			alert("context losted");
			cancelAnimationFrame(animationID);
		},false);
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
		var btWrap = $("<div/>",{"class":"gl-bt-wrapper top"}).appendTo("body"),
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
		}).appendTo(btWrap).on("click",funcs.btnTrigger)
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