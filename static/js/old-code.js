
// Stars: example for bufferGeometry!
// const points = new THREE.Points();
// const bufferGeometry = new THREE.BufferGeometry();
// const starMtl = new THREE.PointsMaterial({
//     color: 0xffffff,
//     size: 0.64,
// });
// const positions = [];
// const colors = [];
// for (let i = 0; i < 16384; i++) {
//     const x = Math.random()*1000 - 500;
//     const y = Math.random()*1000 - 500;
//     const z = Math.random()*1000 - 500;
//     positions.push(x, y, z);
//     colors.push(
//         Math.abs(Math.random() - 0.5),
//         Math.abs(Math.random() - 0.5),
//         Math.abs(Math.random() - 0.5)
//     );
// }
// bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
// bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
// points.geometry = bufferGeometry;
// points.material = starMtl;
// scene.add(points);
// points.layers.enable( BLOOM_SCENE );
// materials[ points.uuid ] = starMtl;

// sphere thing: example for bloom usage!
// const geometry = new THREE.SphereGeometry(1, 64, 32);
// const material = new THREE.MeshNormalMaterial();
// const sphere = new THREE.Mesh(geometry, material);
// sphere.position.set(0, 0, 0);
// scene.add(sphere);
// sphere.layers.enable( BLOOM_SCENE );
// materials[ sphere.uuid ] = material;
