import * as THREE from "./lib/three.module.js";
import { DeviceOrientationControls } from "./lib/DeviceOrientationControls.js";
import { OrbitControls } from "./lib/OrbitControls.js";
import { Water } from "./lib/Water.js";
import {
    CSS3DRenderer,
    CSS3DObject,
} from "./lib/CSS3DRenderer.js";

let camera,
    scene,
    renderer,
    orbit_controls,
    device_controls,
    dummy,
    overlay,
    sceneCSS, 
    overlayElement, 
    worldElement, 
    canvasElement, 
    water;

let mobile = false;

export function start() {
    document.querySelector("#home").style.display = "none";
    document.querySelector("#world").removeAttribute("hidden");

    init();
    animate();
    onWindowResize();
}

document.getElementById("start").onclick = start;

function addWater() {
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load(
            "assets/waternormals.jpg",
            function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }
        ),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 2.7,
        fog: true,
    });

    water.position.set(0, -30, 0);
    water.rotation.x = -Math.PI / 2;
    console.log(water.material.uniforms.size)
    water.material.uniforms.size.value = 10;
    scene.add(water);
}

function addTopText() {
    const loader = new THREE.FontLoader();

    loader.load("assets/helvetiker_regular.typeface.json", function (font) {
        const geometry = new THREE.TextGeometry("Nicholas Ficara", {
            font: font,
            size: 20,
            height: 2,
            curveSegments: 12,
            bevelEnabled: false,
        });
        const material = new THREE.MeshStandardMaterial({
            color: "#fff",
            emissive: "#000"
        });
        const text = new THREE.Mesh(geometry, material);
        geometry.computeBoundingBox();
        console.log(geometry.boundingBox);
        geometry.center();
        text.position.set(0, 75, 300);
        text.rotateY(Math.PI);
        scene.add(text);
    });
}

function addHelper() {
    const helperGeometry = new THREE.BoxGeometry(100, 100, 100, 4, 4, 4);
    const helperMaterial = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        wireframe: true,
    });
    const helper = new THREE.Mesh(helperGeometry, helperMaterial);
    scene.add(helper);
}

function addHDRI() {
    const geometry = new THREE.SphereGeometry(500, 50, 30);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./assets/4.jpg"),
    });

    const HDRI = new THREE.Mesh(geometry, material);
    scene.add(HDRI);
}

function init() {
    canvasElement = document.querySelector("#canvas");
    overlayElement = document.querySelector("#overlay");
    worldElement = document.querySelector("#world");

    renderer = new THREE.WebGLRenderer({ canvas: canvasElement });

    overlay = new CSS3DRenderer();
    overlay.domElement.style.position = "absolute";
    overlay.domElement.style.top = 0;
    overlay.domElement.style.pointerEvents = "none";
    worldElement.appendChild(overlay.domElement);
    
    scene = new THREE.Scene();
    
    sceneCSS = new THREE.Scene();
    var object = new CSS3DObject(overlayElement);
    sceneCSS.add(object);
    object.position.set(0, 0, 500);
    object.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1100
    );

    // scene -> dummy (for device) -> camera (for orbit)
    // camera gets locked when device movement is detected
    dummy = new THREE.Object3D();
    scene.add(dummy);
    dummy.add(camera);

    // can't have same position to orbit
    camera.position.set(0, 0, 0.01);
    dummy.position.set(0, 0, 0.02);

    // define device controls
    device_controls = new DeviceOrientationControls(dummy);
    //define orbit controls and some properties
    orbit_controls = new OrbitControls(dummy, renderer.domElement);
    orbit_controls.enableZoom = false;
    orbit_controls.enablePan = false;
    orbit_controls.enableDamping = true;
    orbit_controls.rotateSpeed = -0.25;

    const light = new THREE.PointLight("#fff", 1, 100);
    light.position.set(0, 50, 100);
    scene.add(light);

    addHDRI();
    //addHelper();
    addWater();
    addTopText();

    window.addEventListener("resize", onWindowResize);
}

function animate() {
    window.requestAnimationFrame(animate);

    orbit_controls.update();
    if (mobile) device_controls.update();

    if (!mobile && device_controls.deviceOrientation.alpha) {
        mobile = true;
        device_controls.object = camera;
        orbit_controls.maxPolarAngle = Math.PI / 2;
        orbit_controls.minPolarAngle = Math.PI / 2;
        console.log("mobile detected");
    }

    // update water
    water.material.uniforms["time"].value += 1.0 / 60.0;

    renderer.render(scene, camera);
    overlay.render(sceneCSS, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    overlay.setSize(window.innerWidth, window.innerHeight);
}
