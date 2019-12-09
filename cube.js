//import modules THREE & datapoints
const THREE = require('three');
const data = require('./Project 2 Data/spiral.json'); //project2 data points-- (array)
const OrbitControls = require('three-orbitcontrols');

//declare variables
var scene, camera, renderer;
var mesh;
//array of cubes created
var meshObjects = [];

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), intersection;
 
//initial function 
function init(){
    //initializes scene, camera, renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();


        //init renderer
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );


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

        var mesh = new THREE.Mesh(geometry, material,); //new cube initialized
        mesh.position.x = data[i].x         //sets cube with position attributes from JSON file
        mesh.position.y = data[i].y
        mesh.position.z = data[i].z
        mesh.scale.x = 0.05;            //scales cube size
        mesh.scale.y = 0.05;
        mesh.scale.z = 0.05;
        // mesh.callback = objectClickHandler;
    //and ADD point to scene, i times
        scene.add( mesh ); 
        //adds cube into array
        meshObjects.push(mesh);

    }
    //initial camera position
    camera.position.z = 5;  
}


//RENDERING THE SCENE // -------------------------------------------------------------
function animate() {
    requestAnimationFrame( animate );
    // mesh.rotation.y = (mesh.rotation.y + 0.005) % maxRotation;

    renderer.render( scene, camera );
    // render();
    // point.rotation.x += 0.01;
    // point.rotation.y += 0.01;
}

//onload runs this function
window.onload = function() {

    init();
    animate();
    
    // Handle all clicks to determine of a three.js object was clicked and trigger its callback
    function onDocumentMouseDown(event) {
        event.preventDefault();
 
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y =  - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
 
        raycaster.setFromCamera(mouse, camera);
 
        // three.js objects with click handlers we are interested in
        var r = Math.floor(Math.random() * 1000) + 1 
        // var intersects = raycaster.intersectObjects(meshObjects);
        // for( var i = 0; i < intersects.length; i++ ) {
        var intersects = raycaster.intersectObjects(meshObjects);

         for( var i = 0; i < intersects.length; i++ ) {
            var intersection = intersects[ i ];
            if(intersects.length>0){
                intersects[i].object.material = new THREE.MeshBasicMaterial({ color: 0xffffff});
                // console.log("cube clicked"+ data[i].name);;
                alert("Point #"+ r );
            }
        }
    }
    //event listener -- clicks ^
    renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);


    //this function is for when the mouse goes over a certain cube
    function onDocumentMouseMove(event) {
        event.preventDefault();
        
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y =  - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);


        var intersects = raycaster.intersectObjects(meshObjects);
        for( var i = 0; i < intersects.length; i++ ) {
            var intersection = intersects[ i ];
             if(intersects.length>0){
                 intersects[i].object.material = new THREE.MeshNormalMaterial();;
            }else  { // there are no intersections   
                 if (intersects!= intersects[0] )intersects[i].object.material = new THREE.MeshNormalMaterial();
              // remove previous intersection object reference
              // by setting current intersection object to "nothing"
                intersection = null;
           
          }
        //     if(intersects.length>0){
        //          intersects[i].object.material = new THREE.MeshBasicMaterial({ color: 0xffffff});
        //     }else  { // there are no intersections
        //     //   if ( intersects[0] ){
        //         intersects[i].object.material = new THREE.MeshNormalMaterial();
        //       // remove previous intersection object reference
        //       // by setting current intersection object to "nothing"
        //       intersection = null;
        //     //   }
        //   }
        }
        // if (intersects.length > 0){
            
        // }else {
        // }
 
    }
 
    // document.addEventListener('mousemove', onDocumentMouseMove, false);
    // renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);

};

