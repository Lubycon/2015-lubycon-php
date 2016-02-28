/*
date: 2015-08-24
program: obj file loader(previewer)
copyright: Lubycon@dart
* threejs.org
*/




var container, stats;
var camera, controls, scene, renderer;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


running();

function running() {

	gl = document.createElement( 'div' );
	document.body.appendChild( gl );
	//gl_canvas ready

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 300;
	camera.position.y = 100;
	//camera setting

	scene = new THREE.Scene();
	//make a scene
	var ambient = new THREE.AmbientLight( 0xffffff );//white
	scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0xffffff );//white
	directionalLight.position.set( 1, 1, 1 ).normalize();//x,y,z(1,1,1)
	scene.add( directionalLight );

	// model

	var onProgress = function ( xhr ) { //xhr = XML Http Request
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};//loading...

	var onError = function ( xhr ) {
		console.log("Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
	};//xhr error


	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

	var loader = new THREE.OBJMTLLoader();
	loader.load( 'model/male02.obj', 'model/male02_dds.mtl', function ( object ) {
		object.position.y = -80;
		object.rotation.y = 0.5;
		scene.add( object );
	}, onProgress, onError );
	//obj=modeling file, mtl=texture information file


	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);//pixel ratio setting
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x262626, 1);//background color
	gl.appendChild(renderer.domElement);

	controls = new THREE.OrbitControls(camera);//mouse control on
	
	window.addEventListener( 'resize', onWindowResize, false );
	animate();
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}


//

function animate(){
	requestAnimationFrame( animate );
	//if you want add animation to this object, you can write here
	render();
}

function render() {
	renderer.render( scene, camera );
}
