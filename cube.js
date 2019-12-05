const THREE = require('three');
const data = require('./Project 2 Data/spiral.json');
const OrbitControls = require('three-orbitcontrols');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const movement = new OrbitControls(camera, renderer.domElement);


for (let i = 0; i < data.length; i++) {
console.log(data[i]);
    
    //CREATING THE CUBE-----------------------------------------------------------------------------------------------
    var geometry = new THREE.BoxGeometry( 1, 1, 1);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = data[i].x
    cube.position.y = data[i].y
    cube.position.z = data[i].z
    cube.scale.x = 0.1;
    cube.scale.y = 0.1;
    cube.scale.z = 0.1;

    scene.add( cube ); 
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