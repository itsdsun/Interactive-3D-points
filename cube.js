//import modules THREE & datapoints
const THREE = require("three");
const data = require("./Project 2 Data/spiral.json"); //project2 data points-- (array)
const OrbitControls = require("three-orbitcontrols");
const interactionTest = require("three.interaction");

//declare variables
var scene, camera, renderer;
var mesh;
//array of cubes created
var meshObjects = [];
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
// var raycaster = new THREE.Raycaster();
// var mouse = new THREE.Vector2(),
//   intersection;

//initial function
//initializes scene, camera, renderer
renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#webgl"),
  antialias: true
});

renderer.setSize(WIDTH, HEIGHT);
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const interaction = new interactionTest.Interaction(renderer, scene, camera);

//orbit controls to manipulate camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDampening = true;
controls.enablePan = true;
controls.dampingFactor = 0.07;
controls.screenSpacePanning = false;
controls.minDistance = 0;
controls.maxDistance = 25;
// controls.addEventListener( 'click', change );

//for each data point from project2data
for (let i = 0; i < data.length; i++) {
  //CREATING A POINT-----------------------------------------------------------------------------------------------
  var geometry = new THREE.BoxGeometry();
  var material = new THREE.MeshNormalMaterial(); //meshnormal - maps vectors to rbg colors

  var mesh = new THREE.Mesh(geometry, material); //new cube initialized
  mesh.position.x = data[i].x; //sets cube with position attributes from JSON file
  mesh.position.y = data[i].y;
  mesh.position.z = data[i].z;
  mesh.scale.x = 0.05; //scales cube size
  mesh.scale.y = 0.05;
  mesh.scale.z = 0.05;

  //and ADD point to scene, i times
  scene.add(mesh);
  mesh.cursor = "pointer";
  mesh.on("click", function(ev) {
    alert(data[i].name);
  });

  //adds cube into array
}
//initial camera position
camera.position.z = 5;


//RENDERING THE SCENE // -------------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);
  // mesh.rotation.y = (mesh.rotation.y + 0.005) % maxRotation;

  renderer.render(scene, camera);
  // render();
  //   point.rotation.x += 0.01;
  // point.rotation.y += 0.01;
}

animate();
