const THREE = require('three');
const data = require('./Project 2 Data/spiral.json'); //project2 data points-- (array)
const OrbitControls = require('three-orbitcontrols');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);

//     controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
//         controls.dampingFactor = 0.05;
//         controls.screenSpacePanning = false;
//         controls.minDistance = 100;
//         controls.maxDistance = 500;
//         controls.maxPolarAngle = Math.PI / 2;
        

//for each data point from project2data
for (let i = 0; i < data.length; i++) {
// console.log(data[i]);
    //CREATING A POINT-----------------------------------------------------------------------------------------------
    var geometry = new THREE.BoxGeometry( 1, 1, 1);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // var cube = new THREE.Mesh( geometry, material );
    var point = new THREE.Points(geometry, material);
    point.position.x = data[i].x
    point.position.y = data[i].y
    point.position.z = data[i].z
    point.scale.x = 0.1;
    point.scale.y = 0.1;
    point.scale.z = 0.1;
//and ADD point to scene, i times
    scene.add( point ); 
 }

camera.position.z = 50;


//RENDERING THE SCENE // ANIMATION -- MOVES THE CUBE -------------------------------------------------------------
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
}
animate();

