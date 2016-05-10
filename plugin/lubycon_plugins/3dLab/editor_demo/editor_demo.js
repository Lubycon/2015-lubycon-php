$(window).on("load",function(){
	"use strict";

	var scene, camera, dirLight, ambLight, renderer, controls, statsMemory, statsFPS;
	var group, object, mtl, geometry, material, mesh;
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
		panoramaBG: function(){
			var sphere = new THREE.Mesh(
				new THREE.SphereGeometry(50, 32, 32),
				new THREE.MeshBasicMaterial()
			);
			var imgLoader = new THREE.TextureLoader();
			imgLoader.load("../background.jpg",function(texture){
				console.log(texture);
				sphere.material.map = texture;
				sphere.material.needsUpdate = true;
			});
			imgLoader.crossOright = "anonymous";
			
			console.log(sphere);
			scene.add(sphere);
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
				loader = new THREE.TextureLoader(),
				materials = mesh.material.materials;
				material = materials[id];
				reader.readAsDataURL(file);
				reader.onload = function(event){
					switch(type){
						case "diffuse" :
			       			loader.load(event.target.result,function(texture){
			       				material.map = texture;
			       				material.needsUpdate = true;
			       			});
		       			break;
		       			case "specular" :
		       				loader.load(event.target.result,function(texture){
		       					material.specularMap = texture;
		       					material.needsUpdate = true;
		       				});
	       				break;
	       				case "normal" : 
	       					loader.load(event.target.result,function(texture){
	       						material.normalMap = texture;
	       						material.needsUpdate = true;
	       					});
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
						group = new THREE.Group();
						object = new THREE.OBJLoader().parse(contents);
						console.log(object);
						for(var i = 0, l = object.length; i < l; i++){
							geometry = object[i].geometry;
								geometry.center();
								geometry.dispose();
							material = object[i].material;
							if(material.type == "MeshPhongMaterial"){
								material.specular = new THREE.Color(0xffffff);
								material.specularColor = new THREE.Color(0xffffff);
								material.side = THREE.DoubleSide;
								material.transparent = true;
								material.needsUpdate = true;
								material.dispose();
							}
							else if(material.type == "MultiMaterial"){
								var materials = material.materials;
								for(var j = 0, ml = materials.length; j < ml; j++){
									materials[j].specular = new THREE.Color(0xffffff);
									materials[j].specularColor = new THREE.Color(0xffffff);
									materials[j].side = THREE.DoubleSide;
									materials[j].transparent = true;
									materials[j].needsUpdate = true;
									materials[j].dispose();
								}
							}
							else{
								$.error("WebGl failed loading to material");
							}
							
							mesh = new THREE.Mesh(geometry,material);
								mesh.castShadow = true;
								mesh.receiveShadow = true;
								group.add(mesh);
						}
						console.log(group);	
						scene.add(group);
						uiAddition.materialSelector(group);
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
		autoScaling: function(){
			
		},
		materialSelect: function(){
			var $this = $(this).find(".mtl-option:selected"),
			id = $this.data("value"),
			materials = group.children[0].material.materials,
			material = materials[id],
			color = material.color;
			material.color = new THREE.Color(0xffffff);
			setTimeout(function(){
				material.color = color;
			},200);
		},
		opacityControl: function(){
			var $this = $(this),
			value = $this.val(),
			id = $("#mtlSelector").find(".mtl-option:selected").data("value"),
			materials = group.children[0].material.materials,
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
				if(group.children[0].material.type == "MultiMaterial"){
					var materials = group.children[0].material.materials;
					for(var i = 0, l = materials.length; i < l; i++){
						var material = materials[i],
						option = options.clone();
						option.text(material.name);
						option.attr("data-value",i);
						option.appendTo(selectBox);
						if(i == 0) option.prop("selected",true);
					}
				}
			};
			addOption();
			uiAddition.materialOpacity(mesh,btWrap);
		},
		materialOpacity: function(mesh,wrap){
			var slider = $("<input/>",{ "type":"range","id":"material-opacity","min":"0","max":"1000","value":"1000"})
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

		statsMemory = new Stats();
		statsMemory.setMode(2);
		statsMemory.domElement.style.position = "absolute";
		statsMemory.domElement.style.left = "10px";
		statsMemory.domElement.style.top = "10px";

		statsFPS = new Stats();
		statsFPS.setMode(0);
		statsFPS.domElement.style.position = "absolute";
		statsFPS.domElement.style.left = "10px";
		statsFPS.domElement.style.top = "50px";

		funcs.panoramaBG();

		document.body.appendChild(statsMemory.domElement);
		document.body.appendChild(statsFPS.domElement);

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
		statsMemory.update();
		statsFPS.update();
		controls.update();
		requestAnimationFrame(animate);
		render();
	}
	function render(){
		renderer.render(scene, camera);
	}
});