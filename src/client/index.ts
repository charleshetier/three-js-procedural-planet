import './index.scss';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TransformControls} from 'three/examples/jsm/controls/TransformControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import {GUI} from 'three/examples/jsm/libs/dat.gui.module';
import { Float32BufferAttribute } from 'three';

/** The THREE scene */
const scene = new THREE.Scene();

/** The THREE camera */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/** The THREE renderer */
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const proxySize = 0.15;
const transparentMaterial = new THREE.MeshBasicMaterial();
transparentMaterial.visible = false;
const proxy = new THREE.Mesh(new THREE.BoxBufferGeometry(proxySize, proxySize, proxySize), transparentMaterial);
proxy.position.set(2,0.5,0);
const proxyBoxHelper = new THREE.BoxHelper(proxy);
scene.add(proxyBoxHelper);
scene.add(proxy);

const transformControl = new TransformControls(camera, renderer.domElement);
transformControl.attach(proxy);
scene.add(transformControl);
transformControl.addEventListener( 'change', ()=> proxyBoxHelper.update() );
transformControl.addEventListener( 'change', render );
transformControl.addEventListener( 'dragging-changed', event => controls.enabled = ! event.value);

function createPlanetGeometry(radius: number, pov: THREE.Vector3) {
    const t = ( 1 + Math.sqrt( 5 ) ) / 2;

		const vertices = [
			- 1, t, 0, 	1, t, 0, 	- 1, - t, 0, 	1, - t, 0,
			0, - 1, t, 	0, 1, t,	0, - 1, - t, 	0, 1, - t,
			t, 0, - 1, 	t, 0, 1, 	- t, 0, - 1, 	- t, 0, 1
		];

		const indices = [
			0, 11, 5, 	0, 5, 1, 	0, 1, 7, 	0, 7, 10, 	0, 10, 11,
			1, 5, 9, 	5, 11, 4,	11, 10, 2,	10, 7, 6,	7, 1, 8,
			3, 9, 4, 	3, 4, 2,	3, 2, 6,	3, 6, 8,	3, 8, 9,
			4, 9, 5, 	2, 4, 11,	6, 2, 10,	8, 6, 7,	9, 8, 1
        ];
        
        const geometry = new THREE.BufferGeometry();
        geometry.setIndex(indices);
        const scaleFactor = radius*0.525731086730957;
        geometry.setAttribute('position', new Float32BufferAttribute(vertices.map(v => v*scaleFactor), 3));

        return geometry;
}


// Populating with a default cube
// const geometry = new THREE.IcosahedronBufferGeometry(1, 0);
const geometry = createPlanetGeometry(1, proxy.position);
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
// const gui = new GUI()
// gui.add(cube.position, 'x', -5, 5, 0.01).onChange(render);
// gui.add(cube.position, 'y', -5, 5, 0.01).onChange(render);
// gui.add(cube.position, 'z', -5, 5, 0.01).onChange(render);

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