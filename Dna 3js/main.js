import './style.css'

import * as THREE from 'three';

import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"

const dnaUrl = new URL('scene.gltf', import.meta.url);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.01, 1000);
camera.position.x = -5
camera.position.y = 20


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
// making the camera and renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera)
// creating the thing

//light
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

//helpers 


// controls
const controls = new OrbitControls(camera,renderer.domElement);

const assetLoader = new GLTFLoader();

assetLoader.load(dnaUrl.href, function(gltf) {
  const model = gltf.scene;
  scene.add(model);
  model.position.set(17,8,0);
  model.scale.set(0.01,0.01,0.01)
  model.rotation.z -= 42
  let y = 17

  function a() {
    requestAnimationFrame(a)
    y += 0.01  
    
  }

  a()
  
  

}, undefined, function(error) {
  console.error(error)
})




function animate() {
  requestAnimationFrame( animate );

  

  controls.update();

  renderer.render(scene,camera);
}

animate();