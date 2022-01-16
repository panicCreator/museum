import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { Scene } from "three";

// < -------------- Sizes -------------- >
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// < -------------- GUI ---------------- >
const gui = new dat.GUI();

//<--------------- Canvas -------------------->
const canvas = document.querySelector("canvas.webgl");

//<---------------Scene -------------------->
const scene = new THREE.Scene();

//<--------------- Camera -------------------->
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.x = -75;
camera.position.y = 10;
// camera.position.z = 100;
// camera.lookAt(new THREE.Vector3(10, 10, 0));
scene.add(camera);

//<--------------- Renderer -------------------->
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//
// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//<-------------- Lights -------------->

// const sphere = new THREE.Mesh(
//     new THREE.SphereBufferGeometry( 2, 32, 32),
//     new THREE.MeshStandardMaterial({color: '#ac8e82'})
// )
// sphere.position.set(40, 14, 10);
// scene.add(sphere);
const moonLight = new THREE.DirectionalLight("#ffffff", 0.5);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

const light1 = new THREE.PointLight(0xffffff, 1, 50);
light1.position.set(40, 14, 10);
light1.castShadow = true; // default false
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 1, 50);
light2.position.set(40, 14, 40);
light2.castShadow = true; // defau4t false
scene.add(light2);

const light3 = new THREE.PointLight(0xffffff, 1, 50);
light3.position.set(40, 14, -10);
light3.castShadow = true; // default false
scene.add(light3);

const light4 = new THREE.PointLight(0xffffff, 1, 50);
light4.position.set(40, 14, -40);
light4.castShadow = true; // default false
scene.add(light4);

const light5 = new THREE.PointLight(0xffffff, 1, 50);
light5.position.set(5, 14, -40);
light5.castShadow = true; // default false
scene.add(light5);

const light6 = new THREE.PointLight(0xffffff, 1, 100);
light6.position.set(-10, 14, 45);
light6.castShadow = true; // default false30
scene.add(light6);

function createFloor() {
  let pos = { x: 0, y: -1, z: 3 };
  let scale = { x: 100, y: 2, z: 100 };

  let blockPlane = new THREE.Mesh(
    new THREE.BoxBufferGeometry(),
    new THREE.MeshPhongMaterial({ color: "grey" })
  );
  blockPlane.position.set(pos.x, pos.y, pos.z);
  blockPlane.scale.set(scale.x, scale.y, scale.z);
  blockPlane.castShadow = true;
  blockPlane.receiveShadow = true;
  scene.add(blockPlane);

  blockPlane.userData.ground = true;
}
createFloor();

// < -------------- Textures -------------->
const textureLoader = new THREE.TextureLoader();

const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

//< --------------Shelves -------------->
const shelve1 = new THREE.Mesh(
  new THREE.BoxGeometry(100, 10, 2),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
shelve1.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(shelve1.geometry.attributes.uv.array, 2)
);
shelve1.rotation.x = Math.PI * 0.5;
shelve1.position.z = - 42;
shelve1.position.y = 10;
scene.add(shelve1);
shelve1;

// <--------------walls -------------->

const wall1 = new THREE.Mesh(
    new THREE.BoxGeometry(100, 20, 2),
    new THREE.MeshStandardMaterial({
      map: bricksColorTexture,
      aoMap: bricksAmbientOcclusionTexture,
      normalMap: bricksNormalTexture,
      roughnessMap: bricksRoughnessTexture,
    })
  );
  wall1.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(wall1.geometry.attributes.uv.array, 2)
  );
  wall1.position.y = 10;
  wall1.position.z = -46;
  scene.add(wall1);

const wall2 = new THREE.Mesh(
  new THREE.BoxGeometry(100, 20, 2),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
wall2.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(wall2.geometry.attributes.uv.array, 2)
);
wall2.position.y = 10;
wall2.position.z = 52;
scene.add(wall2);

const wall3 = new THREE.Mesh(
  new THREE.BoxGeometry(98, 20, 2),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
//behind
wall3.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(wall3.geometry.attributes.uv.array, 2)
);
wall3.rotation.y = Math.PI * 0.5;
wall3.position.y = 10;
wall3.position.x = 49;
wall3.position.z = 2;
scene.add(wall3);

const roof = new THREE.Mesh(
  new THREE.BoxGeometry(100, 2, 100),
  new THREE.MeshStandardMaterial({ color: "#ac8e82" })
);
roof.position.y = 20;
roof.position.z = 3;
scene.add(roof);

//< -------------- Shelves -------------->

// <--------------Partition walls -------------------->
const pwall1 = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, 2),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
pwall1.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(pwall1.geometry.attributes.uv.array, 2)
);
pwall1.position.y = 10;
pwall1.rotation.y = Math.PI * 0.5;
pwall1.position.z = -24;
// pwall1.position.x = 24;
scene.add(pwall1);

const pwall2 = new THREE.Mesh(
  new THREE.BoxGeometry(35, 20, 2),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
pwall2.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(pwall2.geometry.attributes.uv.array, 2)
);
pwall2.position.y = 10;
pwall2.rotation.y = Math.PI * 0.5;
pwall2.position.z = 34;
scene.add(pwall2);

const pwall3 = new THREE.Mesh(
  new THREE.BoxGeometry(16, 7, 2),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
pwall3.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(pwall3.geometry.attributes.uv.array, 2)
);
pwall3.position.y = 16.5;
pwall3.rotation.y = Math.PI * 0.5;
pwall3.position.z = 9;
scene.add(pwall3);

// < -------------- Objects ---------------->

let scale = { x: 6, y: 6, z: 6 };
let pos = { x: 15, y: scale.y / 2, z: 15 };

let box = new THREE.Mesh(
  new THREE.BoxBufferGeometry(),
  new THREE.MeshPhongMaterial({ color: 0xdc143c })
);
box.position.set(pos.x, pos.y, pos.z);
box.scale.set(scale.x, scale.y, scale.z);
box.castShadow = true;
box.receiveShadow = true;
scene.add(box);

box.userData.draggable = true;
box.userData.name = "BOX";
console.log(box.position);

//<-------------- Raycaster -------------->
const raycaster = new THREE.Raycaster();
const clickMouse = new THREE.Vector2(); //mouse position of the click present
const moveMouse = new THREE.Vector2(); //mouse position of the click last movement
var draggable = new THREE.Object3D();
var currMouse = new THREE.Vector3();

window.addEventListener("click", (event) => {
  if (draggable) {
    draggable = null;
    console.log("dropped");
    return;
  }

  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(clickMouse, camera);
  const found = raycaster.intersectObjects(scene.children);
  //sorted array to storing all intersection objects

  if (found.length > 0 && found[0].object.userData.draggable) {
    draggable = found[0].object;
    console.log(`found the ${draggable.userData.name}`);
  }
});

window.addEventListener("mousemove", (event) => {
  moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  currMouse.x = event.clientX;
  currMouse.y = event.clientY;
  currMouse.z = event.clientZ;
});

function dragObject() {
  if (draggable != null) {
    // const found = intersect(moveMouse);
    raycaster.setFromCamera(moveMouse, camera);
    const found = raycaster.intersectObjects(scene.children);
    if (found.length > 0) {
      for (let i = 0; i < found.length; i++) {
        if (!found[i].object.userData.ground) continue;

        let target = found[i].point;
        draggable.position.x = target.x;
        draggable.position.z = target.z;
      }
    }
  }
}

//<--------------Flycontrols-------------->
// var flyControls = new THREE.FlyControls(camera, renderer.domElement);
// flyControls.dragToLook = true;
// flyControls.movementSpeed = 10;
// flyControls.rollSpeed = 1;

//< -------------- resize -------------->
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// < -------------- Animations -------------->
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  dragObject();
  camera.lookAt(box.position);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
