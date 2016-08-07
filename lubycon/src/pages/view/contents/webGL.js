function loadWebGLViewer(data){
	'use strict';

	console.log('WEBGL VIEW IS LOADED');

	console.log(data.map,data.lights);
	var skymapJSON = $.parseJSON(data.map),
		lightJSON = $.parseJSON(data.lights),
		modelJSON = $.parseJSON(data.model);

	var windowWidth = isMobile() ? window.innerWidth : window.innerWidth-310,
	windowHeight = 500;
	//windowHeight = isMobile() ? window.innerHeight-200 : window.innerHeight-310;
	console.log(windowWidth,windowHeight);

	var bgPreset3d = backgroundPreset3d,
        bgPreset2d = backgroundPreset2d;

	var body = $("#contents_main");
	var canvas = $("<div/>",{"id":"web-gl"}).prependTo(body);
	var gl = document.getElementById("web-gl");
	console.log(gl);

	var scene = new THREE.Scene();
	console.log(scene);
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
        renderer.setClearColor(0x666666, 1);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
	gl.addEventListener("webglcontextlost", function(event){
		event.preventDefault();
		alert("context is lost");
		cancelAnimationFrame(animationID);
	},false);
	console.log(renderer);
	gl.appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 0.5;
        controls.maxDistance = 100;

	scene.add(camera, cameraLight);
    window.addEventListener("resize", windowResizeGL, false);
    $(document).on("keydown",initCamera);
    animateGL();
    loadUserData();
    //skymapJSON, lightJSON, modelJSON

    function initCamera(event){
        if(event.which == 32){
            camera.position.x = -2;
            camera.position.y = 0.7;
            camera.position.z = 2.5;
            return false;
        }
    }

    function loadUserData(){
        initSkybox();
        initCustomLights();
        initUserModel();
        initController();
    }

	function initSkybox(){
        var enable3D = skymapJSON.threed,
            skymapIndex = skymapJSON.skymap,
            image2DIndex = skymapJSON.image,
            backgroundColor = skymapJSON.color;
        var lights = bgPreset3d[skymapIndex].light;

        if(enable3D) load3DMap();
        else load2DMap();

        loadCustomLights();

        function load3DMap(){
            var skyGeometry = new THREE.SphereGeometry(500, 60, 40);
            var skyMaterial = new THREE.MeshBasicMaterial({
                map : new THREE.TextureLoader().load(bgPreset3d[skymapIndex].image)
            });
                skyMaterial.side = THREE.BackSide;
            var skybox = new THREE.Mesh(skyGeometry,skyMaterial);
                skybox.index = skymapIndex;
                skybox.name = "skybox";
                skybox.material.dispose();
            scene.add(skybox);
        }
        function load2DMap(){
            var target = $("#canvas-background"),
                logo = target.find("#canvas-background-logo");
            target.css("background-color", backgroundColor);
            logo.css("background-image","url(" + bgPreset2d[image2DIndex].image + ")");
            renderer.setClearColor(0x222222, 0);
        }
        function loadCustomLights(){
            for(var i = 0, l = lights.length; i < l; i++){
                var newLight = unpackLight(lights[i],i);
                console.log(newLight);
                scene.add(newLight);
            }
        }
    }

    function initCustomLights(){
        console.log(lightJSON);
        for(var i = 0, l = lightJSON.length; i < l; i++){
            var newLight = unpackLight(lightJSON[i],i);
            console.log(newLight);
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
            default : return false;
			break;
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
        console.log(modelJSON);
        var loader = new THREE.ObjectLoader().parse(modelJSON);
        loader.remove(loader.children[1]);
        scene.add(loader);

        $(document).find("#web-gl-ui").text(JSON.stringify(loader.children[0].userData));
    }

    function initController(){
        var uiPanel = $(document).find(".ui-panel");

        if(isMobile()) {
            $(gl).on("touchstart",uiPanelShow);
        }
        else {
            $(gl).hover(uiPanelShow,uiPanelHide);
        }

        initModelInfo();

        function initModelInfo(){
            var panel = $(document).find(".ui-panel.top"),
            vertexCounter = panel.find(".ui-list[data-value='vertex']").children(".counter"),
            faceCounter = panel.find(".ui-list[data-value='face']").children(".counter");

            var modelInfo = scene.getObjectByName("mainObject").children[0].userData;

            console.log(modelInfo);
            vertexCounter.text(modelInfo.vertices);
            faceCounter.text(modelInfo.triFaces + modelInfo.quadFaces);
        }
        function uiPanelShow(){
            var panels = $("#web-gl").find(".ui-panel");
            panels.each(function(){
                var $this = $(this),
                type = $this.attr("class").split(" ")[1];
                if(type === "top") $this.css("top",0);
                else if(type === "bottom") $this.css("bottom",0);
                else return false;
            });
            setTimeout(uiPanelHide,5000);
        }
        function uiPanelHide(){
            var panels = $("#web-gl").find(".ui-panel");
            panels.each(function(){
                var $this = $(this),
                type = $this.attr("class").split(" ")[1];
                if(type === "top") $this.css("top",$this.height()*-1+"px");
                else if(type === "bottom") $this.css("bottom",$this.height()*-1+"px");
                else return false;
            });
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
    	var windowWidth = isMobile() ? window.innerWidth : window.innerWidth-310,
        windowHeight = isMobile() ? window.innerHeight-200 : window.innerHeight-310;

    	camera.aspect = windowWidth / windowHeight;
    	camera.updateProjectionMatrix();
    	renderer.setSize(windowWidth, windowHeight);
    }
};
