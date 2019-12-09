const THREE = require('three');
const data = require('./Project 2 Data/spiral.json'); //project2 data points-- (array)
const OrbitControls = require('three-orbitcontrols');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var raycaster = new THREE.Raycaster();
var highlightBox;

var mouse = new THREE.Vector2(), INTERSECTED;
var offset = new THREE.Vector3(10,10,10);




    //init renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


const controls = new OrbitControls(camera, renderer.domElement);


    
        

//for each data point from project2data
for (let i = 0; i < data.length; i++) {
// console.log(data[i]);
    //CREATING A POINT-----------------------------------------------------------------------------------------------
    var geometry = new THREE.BoxGeometry( 1, 1, 1);
    var material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );
    // var cube = new THREE.Mesh( geometry, material );
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = data[i].x
    mesh.position.y = data[i].y
    mesh.position.z = data[i].z
    mesh.scale.x = 0.1;
    mesh.scale.y = 0.1;
    mesh.scale.z = 0.1;
//and ADD point to scene, i times
    scene.add( mesh ); 
 
}
//}
camera.position.z = 5;



//RENDERING THE SCENE // ANIMATION -- MOVES THE CUBE -------------------------------------------------------------
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    // point.rotation.x += 0.01;
    // point.rotation.y += 0.01;

}
animate();


