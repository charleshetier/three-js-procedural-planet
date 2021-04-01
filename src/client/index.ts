import './index.scss';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import {GUI} from 'three/examples/jsm/libs/dat.gui.module';

/** The THREE scene */
const scene = new THREE.Scene();

/** The THREE camera */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/** The THREE renderer */
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Populating with a default cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Populating with a Grid
scene.add(new THREE.GridHelper(10,10, 0xa882222, 0x333333));

// Orbit control creation
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);

// Adding statistics
const stats = Stats();
document.body.appendChild(stats.dom);

// Adding GUI
const gui = new GUI()
gui.add(cube.position, 'x', -5, 5, 0.01).onChange(render);
gui.add(cube.position, 'y', -5, 5, 0.01).onChange(render);
gui.add(cube.position, 'z', -5, 5, 0.01).onChange(render);

// Camera position
camera.position.z = 4;
camera.position.y = 2;
camera.position.x = 1;
camera.lookAt(cube.position);

// Initial render of the scene
render();

/** Renders a frame of the scene */
function render() {
    stats.begin();
    renderer.render(scene, camera);
    stats.end();
}

// Handling window resize scenario
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}