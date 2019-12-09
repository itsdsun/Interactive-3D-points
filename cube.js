const THREE = require('three');
const data = require('./Project 2 Data/spiral.json'); //project2 data points-- (array)
const OrbitControls = require('three-orbitcontrols');

var scene, camera, renderer;
var mesh;
var meshObjects = [];

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), intersection;

// var raycaster = new THREE.Raycaster();
// var highlightBox;

// var mouse = new THREE.Vector2(), INTERSECTED;
// var offset = new THREE.Vector3(10,10,10);

 
function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();

        //init renderer
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );


    const controls = new OrbitControls(camera, renderer.domElement);

    //for each data point from project2data
    for (let i = 0; i < data.length; i++) {
    // console.log(data[i].name);
        //CREATING A POINT-----------------------------------------------------------------------------------------------
        var geometry = new THREE.BoxGeometry();
        // var material = new THREE.MeshBasicMaterial({ color: 0xff0000});
        // var material = new THREE.PointsMaterial({ size:.01, color: 0xff0000});
        var material = new THREE.MeshNormalMaterial();

        // var mesh = new THREE.Points( geometry, material );
        var mesh = new THREE.Mesh(geometry, material,);
        mesh.position.x = data[i].x
        mesh.position.y = data[i].y
        mesh.position.z = data[i].z
        mesh.scale.x = 0.05;
        mesh.scale.y = 0.05;
        mesh.scale.z = 0.05;
        // mesh.callback = objectClickHandler;
    //and ADD point to scene, i times
        scene.add( mesh ); 
        meshObjects.push(mesh);

    }
    //}
    camera.position.z = 5;
}

// function objectClickHandler() {
//     // camera.position.z = 1;
//     console.log("cube clicked");
// }

//RENDERING THE SCENE // ANIMATION -- MOVES THE CUBE -------------------------------------------------------------
function animate() {
    requestAnimationFrame( animate );
    // mesh.rotation.y = (mesh.rotation.y + 0.005) % maxRotation;

    renderer.render( scene, camera );
    // render();
    // point.rotation.x += 0.01;
    // point.rotation.y += 0.01;
}
var key = function (property) {
    return obj.property;
};
window.onload = function() {
    
    init();
    animate();

// //  function render(){
//     var raycaster = new THREE.Raycaster();
//     var mouse = new THREE.Vector2(), intersection;
 
    // Handle all clicks to determine of a three.js object was clicked and trigger its callback
    function onDocumentMouseDown(event) {
        event.preventDefault();
 
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y =  - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
 
        raycaster.setFromCamera(mouse, camera);
 
         // three.js objects with click handlers we are interested in
        var intersects = raycaster.intersectObjects(meshObjects);
         for( var i = 0; i < intersects.length; i++ ) {
            var intersection = intersects[ i ];
            if(intersects.length>0){
            // obj = intersection.object;
            console.log("cube .. clicked");
            }
          
        }
        // if (intersects.length >  0) {
        //     // for(var i = 0; i < intersects.length; i++){
        //     intersects[0].object.callback();
        //     // intersects[0].object.material.color.set( 0xff0000 );
        // }
 
    }
    document.addEventListener('mousedown', onDocumentMouseDown, false);


    // Using the same logic as above, determine if we are currently mousing over a three.js object,
    // and adjust the animation to provide visual feedback accordingly
    function onDocumentMouseMove(event) {
        // event.preventDefault();
 
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y =  - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(meshObjects);
        for( var i = 0; i < intersects.length; i++ ) {
            var intersection = intersects[ i ];
             if(intersects.length>0){
                 intersects[i].object.material = new THREE.MeshBasicMaterial({ color: 0xffffff});
            }else  { // there are no intersections
              // restore previous intersection object (if it exists) to its original color
            //   if ( intersects[0] ){
                intersects[i].object.material = new THREE.MeshNormalMaterial();
              // remove previous intersection object reference
              // by setting current intersection object to "nothing"
                intersection = null;
            //   }
          }
        //     if(intersects.length>0){
        //          intersects[i].object.material = new THREE.MeshBasicMaterial({ color: 0xffffff});
        //     }else  { // there are no intersections
        //       // restore previous intersection object (if it exists) to its original color
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
    renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);

};
