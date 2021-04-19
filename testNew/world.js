import * as THREE from "./lib/three.module.js";
import { DeviceOrientationControls } from "./lib/DeviceOrientationControls.js";
import { OrbitControls } from "./lib/OrbitControls.js";
import { Water } from "./lib/Water.js";
import { BendModifier } from "./lib/BendModifier.js";
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
    overlayElementF,
    overlayElementB,
    overlayElementL,
    overlayElementR,
    worldElement,
    canvasElement,
    mobileControlsElement,
    deviceControlsElement,
    water,
    HDRI, 
    manager, 
    mobile = false, 
    animationDone = false, 
    loadingDone = false, 
    readyFired = false;

function ready(signal) {
    if (signal === 1) animationDone = true;
    if (signal === 0) loadingDone = true;
    if (animationDone && loadingDone && !readyFired) {
        document.querySelector("#home").style.display = "none";
        worldElement.removeAttribute("hidden");
        console.log("[II] Starting animation of first frame");
        animate();
        console.log("[II] Done animating first frame");
        onWindowResize();
        document.querySelector("#cover").classList.add("white");
        console.log("[II] Fading into 3D scene");
        readyFired = true;
    }
}

export function start() {
    document.querySelector("#home").classList.add("black");
    document.querySelector("#homeContainer").classList.add("transparent");
    console.log("[II] Fading to black");
    document
        .querySelector("#home")
        .addEventListener("animationend", ()=>ready(1));
    document.querySelector("#bg").volume = 0.05;
    document.getElementById("music").onchange = (element) => {
        if (element.target.checked) document.getElementById("bg").play();
        if (!element.target.checked) document.getElementById("bg").pause();
    };

    init();
}

document.getElementById("start").onclick = start;

function addWater() {
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader(manager).load(
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

    water.position.set(0, -10, 0);
    water.rotation.x = -Math.PI / 2;
    //console.log(water.material.uniforms.size)
    water.material.uniforms.size.value = 10;
    scene.add(water);
}

function text(font, textContent, position, rotation, bend = false) {
    const geometry = new THREE.TextGeometry(textContent, {
        font: font,
        size: 20,
        height: 2,
        curveSegments: 12,
        bevelEnabled: false,
    });

    if (bend) {
        var modifier = new BendModifier();
        modifier
            .set(
                new THREE.Vector3(0, -1, 0),
                new THREE.Vector3(0, 0, 1),
                Math.PI / 9
            )
            .modify(geometry);
    }

    const material = new THREE.MeshStandardMaterial({
        color: "#fff",
        emissive: "#000",
    });
    const text = new THREE.Mesh(geometry, material);
    geometry.computeBoundingBox();
    //console.log(geometry.boundingBox);
    geometry.center();
    text.position.set(position[0], position[1], position[2]);
    text.rotateY(rotation);
    scene.add(text);
    return text;
}

function addText() {
    const loader = new THREE.FontLoader();

    loader.load("assets/helvetiker_regular.typeface.json", function (font) {
        text(font, "Nicholas Ficara", [0, 125, 300], Math.PI, true);
        text(font, "Connect with me", [0, 75, -300], 0);
        text(font, "Skills Wall", [300, 75, 0], -Math.PI/2);
        text(font, "My Projects", [-300, 75, 0], Math.PI / 2);
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
    const geometry = new THREE.SphereGeometry(10000, 50, 30);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader(manager).load("./assets/006.jpeg"),
    });

    HDRI = new THREE.Mesh(geometry, material);
    scene.add(HDRI);

    HDRI.rotateY(Math.PI/2+0.2);
    //HDRI.rotateZ(-Math.PI / 6);
}

function addHTML() {
    var objectF = new CSS3DObject(overlayElementF);
    sceneCSS.add(objectF);
    objectF.position.set(0, 0, 500);
    objectF.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));
    var objectB = new CSS3DObject(overlayElementB);
    sceneCSS.add(objectB);
    objectB.position.set(0, 0, -250);
    var objectL = new CSS3DObject(overlayElementL);
    sceneCSS.add(objectL);
    objectL.position.set(500, 0, 0);
    objectL.rotation.y = -Math.PI / 2;
    var objectR = new CSS3DObject(overlayElementR);
    sceneCSS.add(objectR);
    objectR.position.set(500, 0, 0);
    objectR.rotation.y = Math.PI / 2;
    objectR.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));
}

function addParticles() {
    
}

function init() {
    canvasElement = document.querySelector("#canvas");
    overlayElement = document.querySelector("#overlay");
    overlayElementF = document.querySelector("#overlayF");
    overlayElementB = document.querySelector("#overlayB");
    overlayElementL = document.querySelector("#overlayL");
    overlayElementR = document.querySelector("#overlayR");
    worldElement = document.querySelector("#world");
    mobileControlsElement = document.querySelector("#mobileControls");
    deviceControlsElement = document.querySelector("#deviceControls");

    manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log("[II] Loading: ", (loaded / total) * 100 + "%");
        if (loaded === total) {
            ready(0);
            console.log("[II] Done loading assets");
        }
    };

    renderer = new THREE.WebGLRenderer({ canvas: canvasElement, antialias: 1 });
    renderer.setPixelRatio(2);

    overlay = new CSS3DRenderer();
    overlay.domElement.style.position = "absolute";
    overlay.domElement.style.top = 0;
    overlay.domElement.style.pointerEvents = "none";
    worldElement.appendChild(overlay.domElement);
    
    scene = new THREE.Scene();
    
    sceneCSS = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10001
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
    orbit_controls.rotateSpeed = -.4;
    orbit_controls.dampingFactor = .125;

    const light = new THREE.PointLight("#fff", 2, 1000, 1);
    light.position.set(0, 50, 100);
    scene.add(light);

    addHDRI();
    //addHelper();
    addWater();
    addText();
    addHTML();
    addParticles();

    document.querySelector("#bg").play();
    window.addEventListener("resize", onWindowResize);
}

function animate() {
    window.requestAnimationFrame(animate);
    

    orbit_controls.update();
    if (mobile) device_controls.update();
    if (mobile && !deviceControlsElement.checked) {
        mobile = false;
        orbit_controls.maxPolarAngle = Math.PI;
        orbit_controls.minPolarAngle = 0;
        camera.rotation.set(0, 0, 0);
    } 
    if (device_controls.deviceOrientation.alpha) {
        mobileControlsElement.removeAttribute("hidden");
    }
    if (!mobile && deviceControlsElement.checked) {
        mobile = true;
        device_controls.object = camera;
        orbit_controls.maxPolarAngle = Math.PI / 2;
        orbit_controls.minPolarAngle = Math.PI / 2;
        console.log("[II] Mobile Detected");
    }

    // update water
    water.material.uniforms["time"].value += 1.0 / 60.0;

    // update sky
    //HDRI.rotation.x += 0.0003;

    renderer.render(scene, camera);
    overlay.render(sceneCSS, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    overlay.setSize(window.innerWidth, window.innerHeight);
}
